import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const tokenRoot = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.join(tokenRoot, "source");
const outputPath = path.join(tokenRoot, "generated.css");

const sources = {
  primitives: path.join(sourceRoot, "primitives.tokens.json"),
  light: path.join(sourceRoot, "light.tokens.json"),
  dark: path.join(sourceRoot, "dark.tokens.json"),
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function flattenTokens(node, segments = [], result = []) {
  for (const [name, value] of Object.entries(node)) {
    if (name.startsWith("$")) continue;
    if (value && typeof value === "object" && "$value" in value) {
      result.push({ path: [...segments, name], token: value });
    } else if (value && typeof value === "object") {
      flattenTokens(value, [...segments, name], result);
    }
  }
  return result;
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function leafSlug(value) {
  return slug(value.replace(/\s*\([^)]*\)\s*/g, ""));
}

function slugPath(segments) {
  return segments.map((segment, index) =>
    index === segments.length - 1 ? leafSlug(segment) : slug(segment)
  );
}

function primitiveName(segments) {
  if (segments[0] === "Colors") {
    const colorSegments = segments.slice(1);
    if (colorSegments[0] === "Base") colorSegments.shift();
    return `color-${slugPath(colorSegments).join("-")}`;
  }
  return `${slug(segments[0])}-${slugPath(segments.slice(1)).join("-")}`;
}

function semanticName(segments) {
  return `color-${leafSlug(segments.at(-1))}`;
}

function sourceVariable(name) {
  return `--sovran-${name}`;
}

function themeVariable(name) {
  return `--${name}`;
}

function colorValue(value) {
  if (typeof value === "string") return null;
  const alpha = value.alpha ?? 1;
  if (alpha === 0) return "transparent";
  if (alpha === 1 && value.hex) return value.hex.toLowerCase();
  const components = value.components.map((component) =>
    Math.round(Number(component) * 255)
  );
  return `rgb(${components.join(" ")} / ${Number(alpha.toFixed(4))})`;
}

function literalValue(token) {
  if (token.$type === "color") return colorValue(token.$value);
  if (token.$type === "number") return `${token.$value}px`;
  throw new Error(`Unsupported token type: ${token.$type}`);
}

function assertUnique(tokens, getName, label) {
  const names = new Map();
  for (const entry of tokens) {
    const name = getName(entry.path);
    const original = entry.path.join("/");
    if (names.has(name)) {
      throw new Error(
        `${label} token collision for ${name}: ${names.get(name)} and ${original}`
      );
    }
    names.set(name, original);
  }
}

const primitiveTokens = flattenTokens(readJson(sources.primitives));
const lightTokens = flattenTokens(readJson(sources.light));
const darkTokens = flattenTokens(readJson(sources.dark));

assertUnique(primitiveTokens, primitiveName, "Primitive");
assertUnique(lightTokens, semanticName, "Light semantic");
assertUnique(darkTokens, semanticName, "Dark semantic");

const primitiveNames = new Map(
  primitiveTokens.map((entry) => [entry.path.join("/"), primitiveName(entry.path)])
);
const unresolvedPrimitiveAliases = new Set();

function semanticNamesByReference(tokens) {
  return new Map(
    tokens.map((entry) => [entry.path.join("."), semanticName(entry.path)])
  );
}

function semanticDeclarations(tokens) {
  const semanticReferences = semanticNamesByReference(tokens);
  return tokens.map(({ path: tokenPath, token }) => {
    const name = semanticName(tokenPath);
    const explicitAlias =
      token.$extensions?.["com.figma.aliasData"]?.targetVariableName;
    const internalAlias =
      typeof token.$value === "string"
        ? token.$value.match(/^\{(.+)\}$/)?.[1]
        : undefined;

    if (explicitAlias) {
      const targetName = primitiveNames.get(explicitAlias);
      if (targetName) {
        return `  ${sourceVariable(name)}: var(${sourceVariable(targetName)});`;
      }
      unresolvedPrimitiveAliases.add(explicitAlias);
    }

    if (internalAlias) {
      const targetName = semanticReferences.get(internalAlias);
      if (!targetName) {
        throw new Error(
          `Unresolved semantic alias ${internalAlias} from ${tokenPath.join("/")}`
        );
      }
      return `  ${sourceVariable(name)}: var(${sourceVariable(targetName)});`;
    }

    const value = literalValue(token);
    if (value === null) {
      throw new Error(`Unresolved token value at ${tokenPath.join("/")}`);
    }
    return `  ${sourceVariable(name)}: ${value};`;
  });
}

const primitiveDeclarations = primitiveTokens.map(({ path: tokenPath, token }) => {
  const value = literalValue(token);
  return `  ${sourceVariable(primitiveName(tokenPath))}: ${value};`;
});
const lightDeclarations = semanticDeclarations(lightTokens);
const darkDeclarations = semanticDeclarations(darkTokens);

const colorThemeNames = [
  ...primitiveTokens
    .filter(({ token }) => token.$type === "color")
    .map(({ path: tokenPath }) => primitiveName(tokenPath)),
  ...lightTokens.map(({ path: tokenPath }) => semanticName(tokenPath)),
];

const themeDeclarations = [...new Set(colorThemeNames)].map(
  (name) => `  ${themeVariable(name)}: var(${sourceVariable(name)});`
);

const output = `/* This file is generated by design-tokens/build-tokens.mjs. Do not edit manually. */

:root,
[data-theme="light"] {
${primitiveDeclarations.join("\n")}

  /* Light semantic and component colors */
${lightDeclarations.join("\n")}
}

[data-theme="dark"] {
${darkDeclarations.join("\n")}
}

@theme inline {
${themeDeclarations.join("\n")}
}
`;

if (process.argv.includes("--check")) {
  const existing = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, "utf8")
    : "";
  if (existing !== output) {
    console.error("Generated design tokens are out of date. Run npm run tokens:build.");
    process.exit(1);
  }
} else {
  fs.writeFileSync(outputPath, output);
  console.log(
    `Generated ${primitiveTokens.length} primitive and ${lightTokens.length} semantic tokens.`
  );
  if (unresolvedPrimitiveAliases.size > 0) {
    console.warn(
      `Used resolved values for ${unresolvedPrimitiveAliases.size} aliases whose primitive collections were not included in the export.`
    );
  }
}

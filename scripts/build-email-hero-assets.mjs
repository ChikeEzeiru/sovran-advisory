import path from "node:path";
import {fileURLToPath} from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const emailImagesDirectory = path.join(projectRoot, "public/images/emails");

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function headingSvg({width, height, lines, x, firstBaseline}) {
  const lineHeight = 44;
  const text = lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${firstBaseline + index * lineHeight}" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="500" letter-spacing="-1.4">${escapeXml(line)}</text>`,
    )
    .join("");

  return Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${text}</svg>`,
  );
}

async function buildHero({
  source,
  output,
  width,
  height,
  overlayOpacity,
  lines,
  firstBaseline,
  logo,
  logoPosition = "left",
}) {
  const overlays = [
    {
      input: Buffer.from(
        `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#000000" fill-opacity="${overlayOpacity}" /></svg>`,
      ),
    },
    {
      input: headingSvg({width, height, lines, x: 16, firstBaseline}),
    },
  ];

  if (logo) {
    overlays.push({
      input: await sharp(path.join(emailImagesDirectory, logo))
        .resize(121, 40)
        .png()
        .toBuffer(),
      top: 8,
      left: logoPosition === "right" ? width - 137 : 8,
    });
  }

  await sharp(path.join(emailImagesDirectory, source))
    .resize(width, height, {fit: "cover"})
    .composite(overlays)
    .jpeg({quality: 90, progressive: true})
    .toFile(path.join(emailImagesDirectory, output));
}

await Promise.all([
  buildHero({
    source: "contact-email-hero.jpg",
    output: "contact-email-hero-composite.jpg",
    width: 600,
    height: 350,
    overlayOpacity: 0.2,
    lines: ["Your enquiry has", "been received"],
    firstBaseline: 246,
    logo: "sovran-logo-light.png",
  }),
  buildHero({
    source: "newsletter-email-hero.jpg",
    output: "newsletter-email-hero-composite.jpg",
    width: 600,
    height: 350,
    overlayOpacity: 0.2,
    lines: ["Confirm your", "subscription"],
    firstBaseline: 246,
    logo: "sovran-logo-light.png",
    logoPosition: "right",
  }),
  buildHero({
    source: "internal-contact-email-hero.jpg",
    output: "internal-contact-email-hero-composite.jpg",
    width: 568,
    height: 262,
    overlayOpacity: 0.35,
    lines: ["New website enquiry"],
    firstBaseline: 230,
  }),
  buildHero({
    source: "internal-newsletter-email-hero.jpg",
    output: "internal-newsletter-email-hero-composite.jpg",
    width: 568,
    height: 262,
    overlayOpacity: 0.3,
    lines: ["Newsletter", "subscription confirmed"],
    firstBaseline: 186,
  }),
]);

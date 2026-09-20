const DOMAIN_LABEL = /^(?!-)[a-z0-9-]{1,63}(?<!-)$/i;

export function normalizeEmail(value: string) {
  const trimmed = value.trim();
  const separator = trimmed.lastIndexOf("@");
  if (separator < 1) return trimmed;

  return `${trimmed.slice(0, separator)}@${trimmed.slice(separator + 1).toLowerCase()}`;
}

export function isValidEmail(value: string) {
  const email = normalizeEmail(value);
  if (!email || email.length > 254 || /[\r\n\s]/.test(email)) return false;

  const separator = email.lastIndexOf("@");
  if (separator < 1 || separator > 64 || separator === email.length - 1) return false;

  const local = email.slice(0, separator);
  const domain = email.slice(separator + 1);
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;

  const labels = domain.split(".");
  return labels.length >= 2 && labels.every((label) => DOMAIN_LABEL.test(label));
}

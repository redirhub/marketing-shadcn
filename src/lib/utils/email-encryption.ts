/**
 * Simple email obfuscation to prevent basic email scraping
 * Uses base64 encoding for simple obfuscation
 */

export function encryptEmail(email: string): string {
  return btoa(email);
}

export function decryptEmail(encrypted: string): string {
  try {
    return atob(encrypted);
  } catch {
    return "";
  }
}

import crypto from 'crypto';

// Master key derived from environment or system constant via sha256 to guarantee 32 bytes for AES-256
const MASTER_SECRET = process.env.ENCRYPTION_MASTER_KEY || 'ASK_SOFTWARE_TECH_MILITARY_GRADE_SECRET_AES_256_GCM_2026';
const ALGORITHM = 'aes-256-gcm';

function getDerivedKey(): Buffer {
  return crypto.createHash('sha256').update(MASTER_SECRET).digest();
}

/**
 * Encrypts sensitive API keys or SMTP passwords using AES-256-GCM (Military Grade Authenticated Encryption)
 */
export function encryptValue(plainText?: string | null): string | null {
  if (!plainText) return null;
  try {
    const key = getDerivedKey();
    const iv = crypto.randomBytes(12); // 96-bit nonce for GCM
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const authTag = cipher.getAuthTag().toString('base64'); // 128-bit authentication tag

    // Format: iv:authTag:encrypted
    return `${iv.toString('base64')}:${authTag}:${encrypted}`;
  } catch (err) {
    console.error('Encryption failed:', err);
    return null;
  }
}

/**
 * Decrypts AES-256-GCM encrypted payload back to plaintext
 */
export function decryptValue(encryptedPayload?: string | null): string | null {
  if (!encryptedPayload || !encryptedPayload.includes(':')) return null;
  try {
    const parts = encryptedPayload.split(':');
    if (parts.length !== 3) return null;

    const iv = Buffer.from(parts[0], 'base64');
    const authTag = Buffer.from(parts[1], 'base64');
    const encryptedText = parts[2];

    const key = getDerivedKey();
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (err) {
    // If decryption fails (e.g. wrong master secret or corrupted tag)
    return null;
  }
}

/**
 * Helper to mask sensitive keys for UI display (e.g. "AIz...a89k" or "••••••••")
 */
export function maskKey(plainTextOrEncrypted?: string | null): string | null {
  if (!plainTextOrEncrypted) return null;
  const decrypted = decryptValue(plainTextOrEncrypted) || plainTextOrEncrypted;
  if (decrypted.length <= 8) return '••••••••';
  return `${decrypted.substring(0, 4)}••••••••${decrypted.substring(decrypted.length - 4)}`;
}

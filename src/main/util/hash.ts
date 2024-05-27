import { createHash, randomBytes } from 'crypto';

export function hashPassword(password: string, salt = '') {
    const hasher = createHash('sha256');
    hasher.update(salt + password);
    return hasher.digest('base64');
}

export function createSalt() {
    return randomBytes(16).toString('base64');
}
import crypto from "crypto";

const salt = 42;

export default function passwordHashing(password: string) {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex');
}
import crypto from "crypto";

/**
 * 32 位的共享密钥
 */
const key = "df7776bae7fd88783aec2cf3c79d54e8";
/**
 * 16 位的初始向量
 */
const iv = "4b1a1cfcb6419e63";
/**
 * 加密算法和操作模式
 */
const algorithm = "aes-256-gcm";

/**
 * 加密
 * @param plainText 明文
 * @author Ming07
 */
export function Cipher(
    plainText: string,
): {
    /**
     * 密文
     */
    cipherText: string;
    /**
     * 标签
     */
    tag: string;
} {
    /**
     * 加密算法
     */
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    /**
     * 密文
     */
    let cipherText = cipher.update(plainText, "utf8", "hex");
    cipherText += cipher.final("hex");
    /**
     * 标签(用于验证密文的来源)
     */
    const tag = cipher.getAuthTag().toString("hex");
    return { cipherText, tag };
}

/**
 * 解密
 * @param cipherText 密文
 * @param tag 标签
 * @return 明文
 * @author Ming07
 */
export function Decipher(cipherText: string, tag: string): string {
    /**
     * 解密算法
     */
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(Buffer.from(tag, "hex")); // 验证密文的来源
    /**
     * 明文
     */
    let plainText = decipher.update(cipherText, "hex", "utf8");
    plainText += decipher.final("utf8");
    return plainText;
}

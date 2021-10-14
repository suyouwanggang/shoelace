export declare const secrityKeyObj: {
    setSecrityKey(key: string): void;
    getSecrityKey(): string;
};
/**AES 加密数据*/
export declare const wrapData: (key: string) => string;
/**AES 解密数据*/
export declare const unWrapData: (key: string) => string;

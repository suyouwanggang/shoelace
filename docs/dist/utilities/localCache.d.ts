/**
 *
 * @param key 存储数据key
 * @param value  存储数据,必须支持JSON化
 */
export declare const setLocalCache: (key: string, value: any) => void;
/**
 * 获取缓存数据
 * @param key
 * @returns
 */
export declare const getLocalCache: (key: string) => any;
/**
 * 删除缓存数据
 * @param key
 */
export declare const removeLocalCache: (key: string) => void;
//# sourceMappingURL=localCache.d.ts.map
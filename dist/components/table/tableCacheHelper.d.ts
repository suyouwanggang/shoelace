import SlTable from './table';
/**
 * 前端控制缓存table 布局
 * 包括width,order,hidden
 *
 */
/**定义SlTable 缓存结构 */
declare type TableCacheItem = {
    field: string;
    value: {
        width: string;
        order: number;
        hidden: boolean;
    };
};
declare type TableCacheType = Array<TableCacheItem>;
/**
 * 读取table 状态
 * @param table
 * @returns
 */
export declare const readTableAsCacheValue: (table: SlTable) => TableCacheType;
export declare const removeTableCacheByKey: (key: string) => void;
/**
 * 恢复缺省，去掉所有缓存
 * @param table
 */
export declare const restoreTableDefault: (table: SlTable) => void;
/**
 * 将缓存应用到table
 * @param table
 * @param cache
 */
export declare const restoreFormTableCache: (table: SlTable, cache: TableCacheType) => void;
export declare const restoreFromLocalCache: (table: SlTable) => void;
export declare const saveAsDefaultTableCache: (table: SlTable) => void;
export declare const updateTableCache: (table: SlTable) => void;
export {};
//# sourceMappingURL=tableCacheHelper.d.ts.map
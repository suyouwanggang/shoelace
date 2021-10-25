export declare type selectMode = 'date' | 'month' | 'year';
/**
 * 将日期格式串，或者数值时间，转换为Date 对象
 * @param d 日期格式串，或者数值时间
 * @returns
 */
export declare const castDate: (d: string | number | undefined) => Date | undefined;
/** 判断 一个日期是否是 一个合法的日期 */
export declare const isValidDate: (date?: Date | null | undefined) => boolean | null | undefined;
export declare type selectDateType = 'date' | 'month' | 'year';
/**
 * 获取 日期的 年，月，日 组成的数据（月起始为1）
 * @param d
 * @returns
 */
export declare const getDateYearMonthDay: (d: string | Date | number | undefined) => number[];
/**
 * 将日期转为 可读字符串 格式
 * @param dateString
 * @param type 'date'|'year'|'month'
 * @returns
 */
export declare const parseDate: (dateString: string | Date, type?: selectDateType) => string;
/**
 * 获取当前 年 月 看板
 * @param year
 * @param month ，默认从1 开始
 */
export declare const getDaysPanel: (year: number, month?: number) => Date[];
/**
 * 判断两个时间是否相等
 * @param d1
 * @param d2
 * @param mode  是比较 'year'|'month'|'date'
 * @returns
 */
export declare const isEqualsDate: (d1: Date, d2: Date | undefined, mode?: 'year' | 'month' | 'date') => boolean;
//# sourceMappingURL=date.util.d.ts.map
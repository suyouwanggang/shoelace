export type selectMode = 'date' | 'month' | 'year';
/**
 * 将日期格式串，或者数值时间，转换为Date 对象
 * @param d 日期格式串，或者数值时间
 * @returns
 */
export const castDate = (d: string | number | undefined) => {
  const date = d === undefined ? undefined : new Date(d);
  return date;
};
/** 判断 一个日期是否是 一个合法的日期 */
export const isValidDate = (date?: Date | null | undefined) => {
  return date && date instanceof Date && !isNaN(date.getTime());
};
export type selectDateType = 'date' | 'month' | 'year';
/**
 * 获取 日期的 年，月，日 组成的数据（月起始为1）
 * @param d
 * @returns
 */
export const getDateYearMonthDay = (d: string | Date | number | undefined) => {
  const date = d instanceof Date ? d : new Date(d ? d : +new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day];
};
/**
 * 将日期转为 可读字符串 格式
 * @param dateString
 * @param type 'date'|'year'|'month'
 * @returns
 */
export const parseDate = (dateString: string | Date, type: selectDateType = 'date') => {
  const [year, month, day] = getDateYearMonthDay(dateString);
  let value = '';
  switch (type) {
    case 'date':
      value = year + '-' + (month + '').padStart(2, '0') + '-' + (day + '').padStart(2, '0');
      break;
    case 'month':
      value = year + '-' + (month + '').padStart(2, '0');
      break;
    default:
      value = year + '';
      break;
  }
  return value;
};

/**
 * 获取当前 年 月 看板
 * @param year
 * @param month ，默认从1 开始
 */
export const getDaysPanel = (year: number, month: number = 1) => {
  const date = new Date(year, month - 1, 1);
  const week = date.getDay();
  date.setDate(date.getDate() - week);
  const array: Date[] = [];
  let i = 0;
  while (i < 35) {
    array.push(new Date(+date));
    date.setDate(date.getDate() + 1);
    i++;
  }
  return array;
};
/**
 * 判断两个时间是否相等
 * @param d1
 * @param d2
 * @param mode  是比较 'year'|'month'|'date'
 * @returns
 */
export const isEqualsDate = (d1: Date, d2: Date | undefined, mode: 'year' | 'month' | 'date' = 'date') => {
  return d2 ? parseDate(d1, mode) == parseDate(d2, mode) : false;
};

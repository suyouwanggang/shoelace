/**
 * 去掉路径最后面的 '/',如果路径不是/开始，则添加'/'到最前面,连续多个'/' 则被替换为一个'/'
 * @param path
 * @returns
 */
declare const stripExtraTrailingSlash: (path: string) => string;
declare const joinStringPath: (...path: string[]) => string;
/**
 * 将查询字符串 转换为 json Object
 *
 * @example
 * ```ts
 * getQueryData('id=2000&name=10001') ==> {id:2000,name:10001}
 * getQueryData('id=abc&name=%E7%8E%8B%E5%88%9A') ==> {id:'abc',name:'王刚'}
 * ```
 *
 * @param queryString  查询字符串 ，类似 'a=b&c=d&asd=d'
 * @returns
 */
declare const getQueryData: (queryString?: string) => {
    [x: string]: string | string[];
};
declare type ParamterData = {
    [key in string]: string | number | Array<string | number>;
};
/**
 * 将 json data 转化为queryString
 *
 * @example
 * ```ts
 * toQueryString({id:2000,name:1000}) ==> id=2000&name=10001
 * toQueryString({id:'abc',name:'王刚'}) ==> id=abc&name=%E7%8E%8B%E5%88%9A
 * ```
 *
 * @param data jsonObject
 * @returns
 */
declare const toQueryString: (data: ParamterData) => string;
/**
 * 判断路径 path ,是否匹配pattern 路径
 * @link
 * @param path
 * @param pattern
 * @returns
 */
declare const isPathURLMatchPattern: (path: string, pattern: string) => boolean;
/**
 * 判断指定路径 ，是否匹配 pattern路径，如果匹配，则返回object, 包含所有的命名参数，
 * 否则返回 null;
 * @param path
 *  @param pattern
 * @returns
 */
export declare type PathNameResult = {
    [key in string]: string | number;
};
/**
 * 解析路径的 参数值
 *
 * ``` ts
 * getPathNames('/project/info/10001','/project/info/:projectID')
 * 结果为 {projectID: 10001}
 * ```
 * @param path
 * @param pattern
 * @returns
 */
declare const getPathNames: (path: string, pattern: string) => PathNameResult;
/**
 * 接口：处理解密，加密 路径和参数
 */
export interface ResovlePathInterface {
    /**
     * 将hash 路径，转为对象 path,queryString, queryData
     * ```
     * #/wanggang/list?id=232&name=test --> {path:'/wanggang/list', queryData:{id:'232',name:'test'}}
     *
     * ```
     * @param hash
     */
    resolvePath(hash: string): {
        path: string;
        queryString: string;
        queryData: {
            [key: string]: string | string[];
        };
    };
    /**
     * 将url 和jsonData 转化为 hash 路径
     * 例如：url='/wanggang/list' ,jsonData={id:1,b:2}==>   #/wanggang/list?id=1&b=2
     * @param url
     * @param jsonData
     */
    toPath(url: string, jsonData?: PathNameResult): string;
}
declare const defaultResove: ResovlePathInterface;
export { isPathURLMatchPattern, getPathNames, getQueryData, toQueryString, stripExtraTrailingSlash, joinStringPath, defaultResove };
//# sourceMappingURL=pathResovle.d.ts.map
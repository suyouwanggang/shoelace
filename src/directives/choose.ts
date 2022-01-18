import { isFunction } from "../utilities/common";
/**
 * Chooses and evaluates a template function from a list based on matching
 * the given `value` to a case.
 *
 * Cases are structured as `[caseValue, func]`. `value` is matched to
 * `caseValue` by strict equality. The first match is selected. Case values
 * can be of any type including primitives, objects, and symbols.
 *
 * This is similar to a switch statement, but as an expression and without
 * fallthrough.
 * 第一个参数 value, 是值， 第二个参数，二维数组，每行是数组[条件，结果]
 * @example
 *
 * ```ts
 * render() {
 *   return 
 *     ${choose(this.section, [
 *       ['home', (value) => html`<h1>${value}</h1>`]
 *       ['about', () => html`<h1><a href='/About/'</h1>`]
 *     ],
 *     () => html`<h1>Error</h1>`)}
 *   ;
 * }
 * ```
 * 
 *@example 
 *```ts
 * render() {
 *   return 
 *     ${choose(this.section, [
 *       ['home', html`<h1>home</h1>`]
 *       ['about', html`<h1><a href='/About/'</h1>`]
 *     ],
 *     html`<h1>Error</h1>`)}
 *   ;
 * }
 * ```
 */
export const choose = <T,V>(
    value: T,
    cases: [T|((t:T)=>unknown),((result:unknown)=>V)|V][],
    defaultCase?: V|(() => V)
  ) => {
    for (const c of cases) {
      const caseValue = c[0];
      const isFun=isFunction(caseValue );
      const result=isFun?caseValue(value): value==caseValue;
      if (result) {
        const fn = c[1];
        return isFunction(fn)? fn(result):fn;
      }
    }
    return isFunction(defaultCase)?defaultCase():'';
  };
  /**
  * @example
  *
  * ```ts
  * render() {
  *   return 
  *     ${caseChoose(
  *     this.type, 
  *     ['home','about','project'],
  *     [()=>html`home`,()=>html`about`,(v)=>html`${project}`],
  *     '不知道的类型'
  *   ;
  * }
  * ```
  * 
  *@example
  *
  * ```ts
  * render() {
  *   return 
  *     ${caseChoose(
  *     this.type, 
  *     ['home','about','project'],
  *     [html`home`,html`about`,html`${project}`],
  *     '未知类型'
  *   ;
  * }
  * ```
  * 
  */
  export const chooseArray= <T,V>(
    value: T,
    casesList: Array<T|((value:T)=>any)>,
    result:Array<V|((t:T|any)=>V)>,
    defaultCase?: V|(() => V)
  ) => {
    if(casesList.length!=result.length){
        console.warn(`caseList htmlResultList length show be equals`);
        return '';
    }
    let index=0;
    for(const k of casesList){
        const v=isFunction(k)?k(value):k==value;
        if(v){
            const html=result[index];
            return isFunction(html)?html(v):html;
        }
        index++;
    }
    return isFunction(defaultCase)?defaultCase?.():defaultCase;
  };

  /**
   * 将数据 t转化为value 输出
  * @example
  *
  * ```ts
  * render() {
  *   return 
  *     ${convert(
  *     this.value, 
  *     (v)=>v*v
  *   )};
  * }
  * 
  * ```
  */
  export const convert=<T,V>(
    t:T,
    value: (t:T)=>V
  )=>{
    return value(t);
  }

/**
 * When `condition` is true, returns the result of calling `trueCase()`, else
 * returns the result of calling `falseCase()` if `falseCase` is defined.
 *
 * This is a convenience wrapper around a ternary expression that makes it a
 * little nicer to write an inline conditional without an else.
 *
 * @example
 *
 * ```ts
 * render() {
 *   return html`
 *     ${when(this.user, () => html`User: ${this.user.username}`, () => html`Sign In...`)}
 *   `;
 * }
 * ```
 * 
 * @example
 *
 * ```ts
 * render() {
 *   return html`
 *     ${when(this.user, html`User: ${this.user.username}`, html`Sign In...`)}
 *   `;
 * }
 * ```
 * 
 */
  export const when = <T, V>(
    condition: T,
    trueCase:  (() => V)|V,
    falseCase?: (() => V)|V
  ) => {
     return condition? isFunction(trueCase)?trueCase():trueCase: isFunction(falseCase)? falseCase?.():falseCase;
  };

  export const whenRef=when;
   
import stringToTemplateLiteral from 'string-to-template-literal';
import uglifycss from 'uglifycss';
import sass from 'sass';
export function transform({
    css,
    specifier = 'lit',
    tag = 'css',
    uglify = false,
  }) {
    const uglifyOptions = typeof uglify === 'object' ? uglify : undefined;
    const cssContent = !uglify ? css : uglifycss.processString(css, uglifyOptions);
    return `import {${tag}} from '${specifier}';
         const styles = ${tag}${stringToTemplateLiteral(cssContent)};
        export default styles;
  `;
  }
export function listCssPlugin(options){
    const { filter = /\.lit\.css$/, specifier, tag, uglify } = options ?? {};
    return {
        name:'lit-css',
        setup(build){
            const loader='js';
            build.onLoad({filter }, args=>{
                const result= sass.renderSync({
                    file: args.path
                });
                 const css = result.css.toString();
                const contents = transform({ css, specifier, tag, uglify });
                return { contents, loader };

            })
        }
    }
}

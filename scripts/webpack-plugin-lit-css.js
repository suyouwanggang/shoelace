   
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
export default function loader(css){
  const cssText=sass.renderSync({
    data:css,
  }).css.toString();
  const {include = /\.lit\.css$/,  specifier='lit', tag='css', uglify=false} = this.getOptions().options ?? {};
  return transform({ css:cssText, specifier, tag, uglify });
}

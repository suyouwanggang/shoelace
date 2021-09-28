import stringToTemplateLiteral from 'string-to-template-literal';
import uglifycss from 'uglifycss';
import sass from 'sass';
import { resolve } from 'path';
import { createFilter } from 'rollup-pluginutils';
export function transform({ css, specifier = 'lit', tag = 'css', uglify = false }) {
  const uglifyOptions = typeof uglify === 'object' ? uglify : undefined;
  const cssContent = !uglify ? css : uglifycss.processString(css, uglifyOptions);
  return `import {${tag}} from '${specifier}';
         const styles = ${tag}${stringToTemplateLiteral(cssContent)};
        export default styles;
  `;
}
export function rolluplistCssPlugin(options) {
  const { include = /\.lit\.css$/, exclude, specifier = 'lit', tag = 'css', uglify = false } = options ?? {};
  const filter = createFilter(include, exclude);
  return {
    name: 'lit-css',
    load(id) {
      if (filter(id)) this.addWatchFile(resolve(id));
      return null;
    },
    transform(css, id) {
      if (!filter(id)) return null;
      const result = sass.renderSync({
        data: css
      });
      const cssText = result.css.toString();
      const code = transform({ css: cssText, specifier, tag, uglify });
      return { code, map: { mappings: '' } };
    }
  };
}

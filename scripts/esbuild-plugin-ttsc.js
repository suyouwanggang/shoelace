import stringToTemplateLiteral from 'string-to-template-literal';
import fs from 'fs';
import path from 'path';
export function transformTsPlugin(options) {
  return {
    name: 'ts-transform',
    setup(build) {
      const { filter = /\.ts$/ } = options ?? {};
      const loader = 'js';
      build.onLoad({ filter }, args => {
        const dirname = path.dirname(args.path).replace('src', 'ttsc');
        const filename = path.basename(args.path, '.ts') + '.js';
        console.log(path.join(dirname, filename));
        const jsContent = fs.readFileSync(path.join(dirname, filename));
        return { contents: jsContent, loader };
      });
    }
  };
}

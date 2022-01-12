//
// This script generates stylesheets from all *.styles.ts files in src/themes
//
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import fs from 'fs/promises';
import { globbySync } from 'globby';
import { mkdirSync } from 'fs';
import { globby } from 'globby';
import path from 'path';
import prettier from 'prettier';
import stripComments from 'strip-css-comments';
import sass from 'sass';
const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const files = globbySync('./src/themes/**/*.styles.ts');
const cssFiles = globbySync('./src/themes/**/*.css');
const themesDir = path.join(outdir, 'themes');

let cssArray = '';
console.log('Generating stylesheets');
mkdirSync(themesDir, { recursive: true });
try {
  cssFiles.map(file => {
    const source = sass.renderSync({
      file: file
    });
    cssArray += '' + source.css.toString();
  });
} catch (ex) {
  console.error(chalk.red('Error generating theme css styleseheets!'));
  console.error(ex);
}

try {
  files.map(async file => {
    const source = await fs.readFile(file, 'utf8');
    const css = source.match(/export default css`(.*?)`;/s)[1];

    // We're currently scraping for CSS with a regex, so we can't use interpolation at the moment
    if (css.includes('${')) {
      console.error(
        chalk.red(`Template literal expressions are not currently supported in theme stylesheets: ${file}`)
      );
      process.exit(1);
    }
    const filename = path.basename(file).replace('.styles.ts', '.css');
    const formattedStyles = prettier.format(stripComments(css), { parser: 'css' }) + (filename == 'light.css' ? cssArray : '');
    const outfile = path.join(themesDir, filename);
    await fs.writeFile(outfile, formattedStyles, 'utf8');
  });
} catch (err) {
  console.error(chalk.red('Error generating stylesheets!'));
  console.error(err);
}

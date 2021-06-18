import chalk from 'chalk';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import process from 'process';

const args = process.argv.slice(2);
const tagName = (args[0] + '').toLowerCase().trim();
const tagNameWithoutPrefix = tagName.replace(/^sl-/, '');
const className = tagName.replace(/(^\w|-\w)/g, string => string.replace(/-/, '').toUpperCase());
const readableName = tagNameWithoutPrefix
  .replace(/-/g, ' ')
  .replace(/\w\S*/g, string => string.charAt(0).toUpperCase() + string.substr(1).toLowerCase());

const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const minorVersion = packageData.version.split('.').slice(0, 2).join('.');

// Check for tag name
if (!tagName) {
  console.error('Please provide a tag name for the new component.\n');
  process.exit();
}

// Verify tag name prefix
if (!/^sl-/.test(tagName)) {
  console.error('Tag names must start with the sl- prefix.\n');
  process.exit();
}

// Generate a source file
const componentFile = `src/components/${tagNameWithoutPrefix}/${tagNameWithoutPrefix}.ts`;
if (fs.existsSync(componentFile)) {
  console.error(`There is already a component using the <${tagName}> tag!\n`);
  process.exit();
}

const componentSource = `
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from 'sass:./${tagNameWithoutPrefix}.scss';

/**
 * @since ${minorVersion}
 * @status experimental
 *
 * @dependency sl-tag-here
 * @dependency sl-tag-here
 *
 * @slot - The default slot.
 * @slot example - A named slot called example.
 *
 * @part base - The component's base wrapper.
 *
 * @customProperty example - An example custom property
 *
 * @animation example.show - An example animation.
 * @animation example.hide - An example animation.
 */
@customElement('${tagName}')
export default class ${className} extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html\`
      <div part="base">
        <slot></slot>
      </div>
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '${tagName}': ${className};
  }
}
`.trimLeft();

// Generate a stylesheet
const stylesFile = `src/components/${tagNameWithoutPrefix}/${tagNameWithoutPrefix}.scss`;
const stylesSource = `
@use '../../styles/component';

:host {
  display: block;
}
`.trimLeft();

// Generate a docs page
const docsFile = `docs/components/${tagNameWithoutPrefix}.md`;
const docsSource = `
# ${readableName}

[component-header:${tagName}]

Brief description of the component here, followed by an example.

\`\`\`html preview
<${tagName}>
  Hello, world!
</${tagName}>
\`\`\`

## Examples

### Variation

A description of the variation, followed by an example.

\`\`\`html preview
<${tagName}>
  Here is a variation
</${tagName}>
\`\`\`

[component-metadata:${tagName}]
`.trimLeft();

// Create the files
mkdirp.sync(path.dirname(componentFile));
mkdirp.sync(path.dirname(stylesFile));
mkdirp.sync(path.dirname(docsFile));

fs.writeFileSync(componentFile, componentSource, 'utf8');
fs.writeFileSync(stylesFile, stylesSource, 'utf8');
fs.writeFileSync(docsFile, docsSource, 'utf8');

// Add it to shoelace.ts
const allExports = fs.readFileSync('src/shoelace.ts', 'utf8');
fs.writeFileSync(
  'src/shoelace.ts',
  `${allExports.trimRight()}\nexport { default as ${className} } from './components/${tagNameWithoutPrefix}/${tagNameWithoutPrefix}';\n`,
  'utf8'
);

// Add it to _sidebar.md
const sidebar = fs.readFileSync('docs/_sidebar.md', 'utf8');
fs.writeFileSync(
  'docs/_sidebar.md',
  sidebar.replace('- Components', `- Components\n  - [${readableName}](/components/${tagNameWithoutPrefix}.md)`),
  'utf8'
);

console.log(chalk.green(`The <${tagName}> component has been created:`));
console.log(`
- created ${componentFile}
- created ${stylesFile}
- created ${docsFile}
- updated src/shoelace.ts
- updated docs/_sidebar.md

Use ${chalk.cyan('npm start')} to launch the dev server.
`);
import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
import styleObject from './index.litcss';
// import cssText from  'vditor/dist/index.css';
const result = css `
  ${componentStyles}
  ${styleObject}
`;
export default result;

import { css } from 'lit';
import componentStyles from '../../styles/component.styles';
import styleObject from './index.litcss.style';
export default css`
  ${componentStyles}
  ${styleObject}
`;

const utilityStyles=css`
  sl-date[mode=month]:not([block])::part(input) {
     width:130px;
  }
  sl-date[mode=year]:not([block])::part(input){
      width:100px;
  }
`;
const style = document.createElement('style');
style.textContent = utilityStyles.toString();
document.head.append(style);
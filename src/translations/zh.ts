import { registerTranslation } from '../utilities/localize';
import type { Translation } from '../utilities/localize';

const translation: Translation = {
  $code: 'zh',
  $name: '中文',
  $dir: 'ltr',

  close: '关闭',
  copy: '复制',
  progress: '进度',
  resize: '调整大小',
  scroll_to_end: '滚动到底部',
  scroll_to_start: '滚动到开始',
  select_a_color_from_the_screen: '选择颜色',
  toggle_color_format: '切换颜色样式'
};

registerTranslation(translation);

export default translation;

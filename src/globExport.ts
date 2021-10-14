import { css, html, LitElement, render } from 'lit';
import { restoreFromLocalCache, restoreTableDefault } from './components/table/tableCacheHelper';
import { onEvent } from './utilities/common';
declare global {
  interface Window {
    css: typeof css;
    LitElement: typeof LitElement;
    html: typeof html;
    onEvent: typeof onEvent;
    LitRender: typeof render;
    restoreFromLocalCache: typeof restoreFromLocalCache;
    restoreTableDefault: typeof restoreTableDefault;
  }
}
(globalThis as any).LitElement = LitElement;
(globalThis as any).css = css;
(globalThis as any).html = html;
(globalThis as any).onEvent = onEvent;
(globalThis as any).LitRender = render;
(globalThis as any).restoreTableDefault = restoreTableDefault;
(globalThis as any).restoreFromLocalCache = restoreFromLocalCache;

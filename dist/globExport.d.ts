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

import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @event sl-load - Emitted when the included file is loaded.
 * @event {{ status: number }} sl-error - Emitted when the included file fails to load due to an error.
 */
export default class SlInclude extends LitElement {
    static styles: import("lit").CSSResult;
    /** The location of the HTML file to include. */
    src: string;
    /** The fetch mode to use. */
    mode: 'cors' | 'no-cors' | 'same-origin';
    /**
     * Allows included scripts to be executed. You must ensure the content you're including is trusted, otherwise this
     * option can lead to XSS vulnerabilities in your app!
     */
    allowScripts: boolean;
    executeScript(script: HTMLScriptElement): void;
    handleSrcChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-include': SlInclude;
    }
}
//# sourceMappingURL=include.d.ts.map
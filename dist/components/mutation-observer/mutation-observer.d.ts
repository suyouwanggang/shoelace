import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status experimental
 *
 * @event sl-mutation - Emitted when a mutation occurs.
 *
 * @slot - The content to watch for mutations.
 */
export default class SlMutationObserver extends LitElement {
    static styles: import("lit").CSSResult;
    private mutationObserver;
    /**
     * Watches for changes to attributes. If empty, all changes will be reported. To watch only specific attributes,
     * separate them by a space.
     */
    attr: string;
    /** Indicates whether or not the attribute's previous value should be recorded when monitoring changes. */
    attrOldValue: boolean;
    /** Watches for changes to the character data contained within the node. */
    charData: boolean;
    /** Indicates whether or not the previous value of the node's text should be recorded. */
    charDataOldValue: boolean;
    /** Watches for the addition or removal of new child nodes. */
    childList: boolean;
    /** Disables the observer. */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleDisabledChange(): void;
    handleChange(): void;
    handleMutation(mutationList: MutationRecord[]): void;
    startObserver(): void;
    stopObserver(): void;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-mutation-observer': SlMutationObserver;
    }
}
//# sourceMappingURL=mutation-observer.d.ts.map
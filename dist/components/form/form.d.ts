import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The form's content.
 *
 * @event {{ formData: FormData, formControls: [] }} sl-submit - Emitted when the form is submitted. This event will not
 *   be emitted if any form control inside of it is in an invalid state, unless the form has the `novalidate` attribute.
 *   Note that there is never a need to prevent this event, since it doen't send a GET or POST request like native
 *   forms. To "prevent" submission, use a conditional around the XHR request you use to submit the form's data with.
 *
 * @csspart base - The component's base wrapper.
 */
export default class SlForm extends LitElement {
    static styles: import("lit").CSSResult;
    form: HTMLElement;
    private formControls;
    /** Prevent the form from validating inputs before submitting. */
    novalidate: boolean;
    connectedCallback(): void;
    /** Serializes all form controls elements and returns a `FormData` object. */
    getFormData(): FormData;
    /** Gets all form control elements (native and custom). */
    getFormControls(): HTMLElement[];
    /**
     * Submits the form. If all controls are valid, the `sl-submit` event will be emitted and the promise will resolve
     * with `true`. If any form control is invalid, the promise will resolve with `false` and no event will be emitted.
     */
    submit(): boolean;
    handleClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    serializeElement(el: HTMLElement, formData: FormData): void | null;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-form': SlForm;
    }
}

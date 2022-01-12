import { ReactiveController, ReactiveControllerHost, TemplateResult } from 'lit';
import './formdata-event-polyfill';
export interface FormSubmitControllerOptions {
    /** A function that returns the form containing the form control. */
    form: (input: unknown) => HTMLFormElement;
    /** A function that returns the form control's name, which will be submitted with the form data. */
    name: (input: unknown) => string;
    /** A function that returns the form control's current value. */
    value: (input: unknown) => any;
    /** A function that returns the form control's current disabled state. If disabled, the value won't be submitted. */
    disabled: (input: unknown) => boolean;
    /**
     * A function that maps to the form control's reportValidity() function. When the control is invalid, this will
     * prevent submission and trigger the browser's constraint violation warning.
     */
    reportValidity: (input: unknown) => boolean;
}
export declare class FormSubmitController implements ReactiveController {
    host?: ReactiveControllerHost & Element;
    form?: HTMLFormElement;
    options?: FormSubmitControllerOptions;
    constructor(host: ReactiveControllerHost & Element, options?: FormSubmitControllerOptions);
    hostConnected(): void;
    hostDisconnected(): void;
    handleFormData(event: FormDataEvent): void;
    handleFormSubmit(event: Event): void;
    submit(): void;
}
export declare const renderFormControl: (props: {
    /** The input id, used to map the input to the label */
    inputId: string;
    /***�Ƿ���Ⱦitem ���� */
    form_able?: boolean;
    /** The size of the form control */
    size: 'small' | 'medium' | 'large';
    /** The label id, used to map the label to the input */
    labelId?: string;
    /** The label text (if the label slot isn't used) */
    label?: string;
    /** Whether or not a label slot has been provided. */
    hasLabelSlot?: boolean;
    /** The help text id, used to map the input to the help text */
    helpTextId?: string;
    /** The help text (if the help-text slot isn't used) */
    helpText?: string;
    /** Whether or not a help text slot has been provided. */
    hasHelpTextSlot?: boolean;
    /** A function that gets called when the label is clicked. */
    onLabelClick?: (event: MouseEvent) => void;
}, input: TemplateResult) => TemplateResult<1>;
export declare function getLabelledBy(props: {
    /** The label id, used to map the label to the input */
    labelId: string;
    /** The label text (if the label slot isn't used) */
    label: string;
    /** Whether or not a label slot has been provided. */
    hasLabelSlot: boolean;
    /** The help text id, used to map the input to the help text */
    helpTextId: string;
    /** The help text (if the help-text slot isn't used) */
    helpText: string;
    /** Whether or not a help text slot has been provided. */
    hasHelpTextSlot: boolean;
}): string;
//# sourceMappingURL=form-control.d.ts.map
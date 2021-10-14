import { TemplateResult } from 'lit';
export declare const renderFormControl: (props: {
    /** The input id, used to map the input to the label */
    inputId: string;
    /** The size of the form control */
    size: 'small' | 'medium' | 'large';
    /** The label id, used to map the label to the input */
    labelId?: string | undefined;
    /** The label text (if the label slot isn't used) */
    label?: string | undefined;
    /** Whether or not a label slot has been provided. */
    hasLabelSlot?: boolean | undefined;
    /** The help text id, used to map the input to the help text */
    helpTextId?: string | undefined;
    /** The help text (if the help-text slot isn't used) */
    helpText?: string | undefined;
    /** Whether or not a help text slot has been provided. */
    hasHelpTextSlot?: boolean | undefined;
    /** A function that gets called when the label is clicked. */
    onLabelClick?: ((event: MouseEvent) => void) | undefined;
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
}): string | undefined;

import { LitElement } from 'lit';
/**
 * @since 2.0
 * @status stable
 *
 * @slot - The card's body.
 * @slot header - The card's header.
 * @slot footer - The card's footer.
 * @slot image - The card's image.
 *
 * @csspart base - The component's base wrapper.
 * @csspart image - The card's image, if present.
 * @csspart header - The card's header, if present.
 * @csspart body - The card's body.
 * @csspart footer - The card's footer, if present.
 *
 * @cssproperty --border-color - The card's border color, including borders that occur inside the card.
 * @cssproperty --border-radius - The border radius for card edges.
 * @cssproperty --border-width - The width of card borders.
 * @cssproperty --padding - The padding to use for card sections.*
 */
export default class SlCard extends LitElement {
    static styles: import("lit").CSSResult;
    private hasSlotController;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-card': SlCard;
    }
}
//# sourceMappingURL=card.d.ts.map
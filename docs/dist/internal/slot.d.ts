import { ReactiveController, ReactiveControllerHost } from 'lit';
export declare class HasSlotController implements ReactiveController {
    host: ReactiveControllerHost & Element;
    slotNames: string[];
    constructor(host: ReactiveControllerHost & Element, ...slotNames: string[]);
    hasDefaultSlot(): boolean;
    private hasNamedSlot;
    test(slotName: string): boolean;
    hostConnected(): void;
    hostDisconnected(): void;
    handleSlotChange(event: Event): void;
}
export declare function getInnerHTML(slot: HTMLSlotElement): string;
export declare function getTextContent(slot: HTMLSlotElement): string;
export declare function hasSlot(el: HTMLElement, name?: string): boolean;
//# sourceMappingURL=slot.d.ts.map
import { LitElement } from 'lit';
import SlAcPanel from '../ac-panel/ac-panel';
/**
 * @since 2.0
 * @status experimental
 * @dependency sl-icon
 * @event {{tab:SlAcPanel}} sl-before-tab-change - Emitted before a panel active change.
 * @event {{tab:SlAcPanel}} sl-tab-change - Emitted when a panel active changed.
 * @slot - The default slot.
 * @csspart base - The component's base wrapper.
 * @cssproperty --sl-collapse-border-color - collapse border color.
 */
export default class SlCollapse extends LitElement {
    static styles: import("lit").CSSResult;
    /**是否允许打开多个  */
    multi: boolean;
    render(): import("lit-html").TemplateResult<1>;
    get childTabPanel(): SlAcPanel[];
    /**
     * 根据key 查找 子sl-ac-panel
     * @param key
     * @returns
     */
    findTab(key: string): SlAcPanel | undefined;
    /**
     * 获取 在父节点中的 index
     * @param tab
     * @returns
     */
    getTabIndex(tab: SlAcPanel): number;
    findTabByIndex(index: number): SlAcPanel | null;
    get activeTab(): SlAcPanel[];
    setTabToActive(tab: SlAcPanel, active?: boolean): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-collapse': SlCollapse;
    }
}
//# sourceMappingURL=collapse.d.ts.map
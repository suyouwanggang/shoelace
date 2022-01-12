import { getTabbableBoundary } from '../internal/tabbable';
let activeModals = [];
export default class Modal {
    constructor(element) {
        this.tabDirection = 'forward';
        this.element = element;
        this.handleFocusIn = this.handleFocusIn.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    activate() {
        activeModals.push(this.element);
        document.addEventListener('focusin', this.handleFocusIn);
        document.addEventListener('keydown', this.handleKeyDown);
    }
    deactivate() {
        activeModals = activeModals.filter(modal => modal !== this.element);
        document.removeEventListener('focusin', this.handleFocusIn);
        document.removeEventListener('keydown', this.handleKeyDown);
    }
    isActive() {
        // The "active" modal is always the most recent one shown
        return activeModals.length > 0 && activeModals[activeModals.length - 1] === this.element;
    }
    handleFocusIn(event) {
        const path = event.composedPath();
        // Trap focus so it doesn't go out of the modal's boundary
        if (this.isActive() && !path.includes(this.element)) {
            const { start, end } = getTabbableBoundary(this.element);
            const target = this.tabDirection === 'forward' ? start : end;
            if (typeof (target === null || target === void 0 ? void 0 : target.focus) === 'function') {
                target.focus({ preventScroll: true });
            }
        }
    }
    handleKeyDown(event) {
        // Quick hack to determine tab direction
        if (event.key === 'Tab' && event.shiftKey) {
            this.tabDirection = 'backward';
            setTimeout(() => (this.tabDirection = 'forward'));
        }
    }
}

import * as React from 'react';
import Component from '../../components/router/router';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & {
    onHashRouterBefore?: ((e: Event) => unknown) | undefined;
    onHashRouterAfter?: ((e: Event) => unknown) | undefined;
    onHashPrevented?: ((e: Event) => unknown) | undefined;
    onNotFound?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=index.d.ts.map
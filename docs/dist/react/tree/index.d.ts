import * as React from 'react';
import Component from '../../components/tree/tree';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & {
    onSlTreeNodeClick?: ((e: Event) => unknown) | undefined;
    onSlTreeNodeToogle?: ((e: Event) => unknown) | undefined;
    onSlTreeNodeBeforeToogle?: ((e: Event) => unknown) | undefined;
    onSlTreeNodeOpen?: ((e: Event) => unknown) | undefined;
    onSlTreeNodeClose?: ((e: Event) => unknown) | undefined;
    onSlTreeNodeBeforeOpen?: ((e: Event) => unknown) | undefined;
    onSlTreeNodeBeforeClose?: ((e: Event) => unknown) | undefined;
    onSlTreeNodeSelectChange?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=index.d.ts.map
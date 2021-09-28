declare module '@popperjs/core/dist/esm' {
  export * from '@popperjs/core/lib';
}

declare module '*.css' {
  const styles: string;
  export default styles;
}
declare module '*.litcss' {
  const styles: import('lit').CSSResultGroup;
  export default styles;
}
declare module '*.svg' {
  const svngString: string;
  export default svngString;
}
interface Event {
  delegateTarget: HTMLElement;
}

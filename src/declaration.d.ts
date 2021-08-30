declare module '@popperjs/core/dist/esm' {
  export * from '@popperjs/core/lib';
}

declare module '*.css' {
  const styles: string;
  export default styles;
}
declare module '*.svg' {
  const styles: string;
  export default styles;
}

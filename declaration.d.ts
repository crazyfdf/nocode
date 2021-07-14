// declaration.d.ts
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
interface Window {
  currentCates: null | Array<string>;
  opera: string; // note (@livs-ops): fix property 'opera' does not exist on type 'Window & typeof globalThis'
}

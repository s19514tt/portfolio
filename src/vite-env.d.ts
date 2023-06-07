/// <reference types="vite/client" />
declare module '*.blv' {
  const src: (pram: HTMLDivElement) => string
  export default src
}

// AppComponent(elm: HTMLDivElement)

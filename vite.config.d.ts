declare module "@base44/vite-plugin" {
  import type { Plugin } from "vite";
  interface Base44PluginOptions {
    legacySDKImports?: boolean;
    hmrNotifier?: boolean;
    navigationNotifier?: boolean;
    visualEditAgent?: boolean;
  }
  function base44(options?: Base44PluginOptions): Plugin;
  export default base44;
}

declare module "path" {
  export function resolve(...parts: string[]): string;
  export function dirname(p: string): string;
}
declare module "node:path" {
  export function resolve(...parts: string[]): string;
  export function dirname(p: string): string;
}

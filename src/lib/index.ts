export function createPageUrl(pageName: string): string {
  return "/" + pageName.replaceAll(" ", "-");
}

export { cn, isIframe } from "./utils";

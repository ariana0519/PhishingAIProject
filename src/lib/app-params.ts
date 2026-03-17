const isNode = globalThis.window === undefined;

const nodeStorage = new Map<string, string>();
const storage: Storage | { getItem(k: string): string | null; setItem(k: string, v: string): void; removeItem(k: string): void } = isNode
  ? {
      getItem: (k: string) => nodeStorage.get(k) ?? null,
      setItem: (k: string, v: string) => {
        nodeStorage.set(k, v);
      },
      removeItem: (k: string) => {
        nodeStorage.delete(k);
      },
    }
  : globalThis.window.localStorage;

const toSnakeCase = (str: string): string => {
  return str.replaceAll(/([A-Z])/g, "_$1").toLowerCase();
};

const getAppParamValue = (
  paramName: string,
  options: { defaultValue?: string; removeFromUrl?: boolean } = {}
): string | null => {
  if (isNode) {
    return options.defaultValue ?? null;
  }
  const { defaultValue, removeFromUrl = false } = options;
  const storageKey = `base44_${toSnakeCase(paramName)}`;
  const urlParams = new URLSearchParams(globalThis.window.location.search);
  const searchParam = urlParams.get(paramName);

  if (removeFromUrl) {
    urlParams.delete(paramName);
    const query = urlParams.toString();
    const pathname = globalThis.window.location.pathname;
    const hash = globalThis.window.location.hash;
    const newUrl = pathname + (query ? "?" + query : "") + hash;
    globalThis.window.history.replaceState({}, globalThis.document.title, newUrl);
  }

  if (searchParam) {
    storage.setItem(storageKey, searchParam);
    return searchParam;
  }
  if (defaultValue !== undefined) {
    storage.setItem(storageKey, defaultValue);
    return defaultValue;
  }
  const storedValue = storage.getItem(storageKey);
  if (storedValue) {
    return storedValue;
  }
  return null;
};

const getAppParams = (): {
  appId: string | null;
  token: string | null;
  fromUrl: string | null;
  functionsVersion: string | null;
  appBaseUrl: string | null;
} => {
  if (getAppParamValue("clear_access_token") === "true") {
    storage.removeItem("base44_access_token");
    storage.removeItem("token");
  }
  return {
    appId: getAppParamValue("app_id", {
      defaultValue: import.meta.env.VITE_BASE44_APP_ID as string | undefined,
    }),
    token: getAppParamValue("access_token", { removeFromUrl: true }),
    fromUrl: isNode
      ? null
      : getAppParamValue("from_url", { defaultValue: globalThis.window.location.href }),
    functionsVersion: getAppParamValue("functions_version", {
      defaultValue: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION as string | undefined,
    }),
    appBaseUrl: getAppParamValue("app_base_url", {
      defaultValue: import.meta.env.VITE_BASE44_APP_BASE_URL as string | undefined,
    }),
  };
};

export const appParams = {
  ...getAppParams(),
};

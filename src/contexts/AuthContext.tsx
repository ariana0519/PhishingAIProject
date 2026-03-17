import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { base44 } from "@/api";
import { appParams } from "@/lib/app-params";
import { createAxiosClient } from "@base44/sdk/dist/utils/axios-client.js";

type AuthError = {
  type: string;
  message: string;
};

type AppPublicSettings = {
  id: string;
  public_settings?: unknown;
};

type AuthContextValue = {
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: AuthError | null;
  appPublicSettings: AppPublicSettings | null;
  logout: (shouldRedirect?: boolean) => void;
  navigateToLogin: () => void;
  checkAppState: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const isDevBypass = () => {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  const bypass = host === "localhost" || host === "127.0.0.1";
  const placeholder = !appParams.appId || appParams.appId === "your_app_id";
  const param = new URLSearchParams(window.location.search).get("bypass_auth") === "1";
  return (bypass && placeholder) || param;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const skipAuth = isDevBypass();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(!skipAuth);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(!skipAuth);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [appPublicSettings, setAppPublicSettings] = useState<AppPublicSettings | null>(null);

  const checkUserAuth = useCallback(async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("User auth check failed:", error);
      setIsAuthenticated(false);
      const err = error as { status?: number; message?: string };
      if (err.status === 401 || err.status === 403) {
        setAuthError({
          type: "auth_required",
          message: "Authentication required",
        });
      }
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const checkAppState = useCallback(async () => {
    try {
      setIsLoadingPublicSettings(true);
      setAuthError(null);

      const isDevBypass =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") &&
        (!appParams.appId || appParams.appId === "your_app_id");

      if (isDevBypass) {
        setIsLoadingPublicSettings(false);
        setIsLoadingAuth(false);
        setIsAuthenticated(false);
        return;
      }

      const appClient = createAxiosClient({
        baseURL: "/api/apps/public",
        headers: {
          "X-App-Id": appParams.appId ?? "",
        },
        token: appParams.token ?? undefined,
        interceptResponses: true,
      });

      try {
        const publicSettings = await appClient.get<AppPublicSettings>(
          `/prod/public-settings/by-id/${appParams.appId}`
        );
        setAppPublicSettings(publicSettings.data);

        if (appParams.token) {
          await checkUserAuth();
        } else {
          setIsLoadingAuth(false);
          setIsAuthenticated(false);
        }
      } catch (appError: unknown) {
        console.error("App state check failed:", appError);
        const err = appError as {
          status?: number;
          message?: string;
          data?: { extra_data?: { reason?: string } };
        };

        if (err.status === 403 && err.data?.extra_data?.reason) {
          const reason = err.data.extra_data.reason;
          if (reason === "auth_required") {
            setAuthError({
              type: "auth_required",
              message: "Authentication required",
            });
          } else if (reason === "user_not_registered") {
            setAuthError({
              type: "user_not_registered",
              message: "User not registered for this app",
            });
          } else {
            setAuthError({
              type: reason,
              message: err.message ?? "Unknown error",
            });
          }
        } else {
          setAuthError({
            type: "unknown",
            message: err.message ?? "Failed to load app",
          });
        }
        setIsLoadingAuth(false);
      }
      setIsLoadingPublicSettings(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      setAuthError({
        type: "unknown",
        message: (error as Error).message ?? "An unexpected error occurred",
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  }, [checkUserAuth]);

  useEffect(() => {
    checkAppState();
  }, [checkAppState]);

  const logout = useCallback((shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    if (shouldRedirect) {
      base44.auth.logout(globalThis.window.location.href);
    } else {
      base44.auth.logout();
    }
  }, []);

  const navigateToLogin = useCallback(() => {
    base44.auth.redirectToLogin(globalThis.window.location.href);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      logout,
      navigateToLogin,
      checkAppState,
    }),
    [
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      logout,
      navigateToLogin,
      checkAppState,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

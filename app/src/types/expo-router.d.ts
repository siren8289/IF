declare module "expo-router" {
  import * as React from "react";

  export const router: {
    push: (href: string) => void;
    replace: (href: string) => void;
    back: () => void;
    canGoBack: () => boolean;
    setParams: (params: Record<string, string>) => void;
  };

  export function useRouter(): typeof router;

  export function useLocalSearchParams<
    T extends Record<string, string | string[] | undefined> = Record<string, string | string[]>
  >(): T;

  export const Stack: React.ComponentType<any>;
}

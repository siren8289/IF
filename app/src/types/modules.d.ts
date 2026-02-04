declare module "react-native" {
  import * as React from "react";

  export const View: React.ComponentType<any>;
  export const Text: React.ComponentType<any>;
  export const Pressable: React.ComponentType<any>;
  export const TextInput: React.ComponentType<any>;
  export const StyleSheet: {
    create: (styles: Record<string, any>) => Record<string, any>;
  };
}

declare module "react-native-gesture-handler" {
  import * as React from "react";

  export interface GestureHandlerRootViewProps {
    children?: React.ReactNode;
    style?: any;
  }

  export const GestureHandlerRootView: React.ComponentType<GestureHandlerRootViewProps>;
}

declare module "date-fns" {
  export function format(
    date: Date | number,
    formatStr: string,
    options?: Record<string, any>
  ): string;
}

declare module "date-fns/locale" {
  export const ko: any;
}

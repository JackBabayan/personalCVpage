import "next-themes";
import { ReactNode } from "react";

declare module "next-themes" {
  interface ThemeProviderProps {
    children: ReactNode;
  }
}
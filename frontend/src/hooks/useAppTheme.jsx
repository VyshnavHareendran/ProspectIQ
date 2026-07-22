import { useContext } from "react";
import { ThemeContext } from "../context/AppThemeContext.js";

export function useAppTheme() {
    return useContext(ThemeContext);
}

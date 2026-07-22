import { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppGlobalStyles, createAppTheme } from "../theme";
import { ThemeContext } from "./AppThemeContext.js";

export function AppThemeProvider({ children }) {
    const [mode, setMode] = useState("light");

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ThemeContext.Provider
            value={{
                mode,
                setMode,
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppGlobalStyles />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}


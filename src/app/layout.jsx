"use client";

import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { useMemo } from "react";

function RootProviders({ children }) {
  const [theme, colorMode] = useMode();

  const colorModeValue = useMemo(
    () => ({
      toggleColorMode: colorMode.toggleColorMode,
    }),
    [colorMode]
  );

  return (
    <ColorModeContext.Provider value={colorModeValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}

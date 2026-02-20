import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App.tsx";
import { ThemeProvider } from "./providers/Theme/ThemeProvider.tsx";
import { themeVars } from "./providers/Theme/Theme.ts";
import { DataProvider } from "./providers/Data/DataProvider.tsx";
import { ModalProvider } from "./providers/Modal/ModalProvider.tsx";
import { AuthProvider } from "./providers/Auth/AuthProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      palettes={themeVars.palettes}
      modes={themeVars.modes}
      commonColors={themeVars.commonColors}
      typography={themeVars.typography}
      breakpoints={themeVars.breakpoints}
      components={themeVars.components}
      commonStyles={themeVars.commonStyles}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DataProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </DataProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../design-system/theme";
import { ErrorBoundary } from "../core/error-handling";
import { AppBootstrap } from "./bootstrap/AppBootstrap";
import { RootNavigator } from "./navigation/RootNavigator";

export function App() {
  useEffect(() => {
    AppBootstrap.init().catch((err) => {
      console.error("Failed to initialize app bootstrap:", err);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;

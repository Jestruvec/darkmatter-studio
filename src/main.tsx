import "@/index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "@/App";
import i18n from "@/utils/i18n";
import { LoadingScreen, AuthProvider, ThemeProvider } from "@/components";

// 🔁 Restaurar ruta desde sessionStorage (para GitHub Pages)
const redirect = sessionStorage.redirect;
if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirect);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<LoadingScreen />}>
            <App />
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);

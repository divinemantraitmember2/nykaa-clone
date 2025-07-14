"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store"; // adjust path if needed
import AuthProvider from "./providers/AuthProvider"; // path updated based on your folder structure
import { PagePropsProvider } from "./providers/PagePropsProvider"; // path updated

export default function Providers({ children, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <PagePropsProvider pageProps={pageProps}>
            
            {children}
          </PagePropsProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

// Providers.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import InitClientState from "../lib/initClientState"; 

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitClientState />
      {children}
   
    </Provider>
  );
}

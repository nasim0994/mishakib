import { useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import Spinner from "@/components/shared/Spinner";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const persistedStore = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      {children}
      {/* <PersistGate loading={<Spinner />} persistor={persistedStore}>
        {children}
      </PersistGate> */}
    </Provider>
  );
}

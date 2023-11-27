import { createStore, applyMiddleware, Store } from "redux";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/lib/persistReducer";

import { ApplicationState, rootReducer } from "./store";
import { PERSIST_STORE_KEY } from "./config";

const persistConfig = {
  key: PERSIST_STORE_KEY,
  storage,
};

export default function configureStore(initialState: (ApplicationState & PersistPartial) | undefined): {
  persistor: Persistor;
  store: Store<ApplicationState>;
} {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));

  const persistor = persistStore(store);

  return { store, persistor };
}

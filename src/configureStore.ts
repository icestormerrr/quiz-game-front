import { createStore, applyMiddleware, Store } from "redux";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import { ApplicationState, rootReducer } from "./store";
import { PersistPartial } from "redux-persist/lib/persistReducer";

const persistConfig = {
  key: "root",
  storage,
};

export default function configureStore(initialState: (ApplicationState & PersistPartial) | undefined): {
  persistor: Persistor;
  store: Store<ApplicationState>;
} {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, applyMiddleware(thunk));

  const persistor = persistStore(store);

  return { store, persistor };
}

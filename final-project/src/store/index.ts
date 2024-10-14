import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { productReducer } from "./reducers/productReducer";
import { categoryReducer } from './reducers/categoryReducer';
import { colorReducer } from './reducers/colorReducer';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["product"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  color: colorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
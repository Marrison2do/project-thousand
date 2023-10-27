import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./redux/tokenReducer";
import userReducer from "./redux/userReducer";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "user"],
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
});

const persitedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persitedReducer,
  middleware: [thunk],
});

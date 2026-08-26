import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

/**
 * Replaces CRA's `createStore(rootReducer, composeWithDevTools())`.
 * The reducers themselves are unchanged plain switch reducers; configureStore
 * only supplies the devtools wiring and default middleware.
 */
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    // The app stores non-serialisable values (axios cancel tokens, Dates) in a
    // few slices; keep the CRA behaviour rather than throwing in development.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
  });

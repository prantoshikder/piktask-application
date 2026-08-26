"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../redux/store";

/**
 * A fresh store per request on the server, a single store on the client.
 * Creating it in a ref (rather than at module scope, as CRA did) keeps state
 * from leaking between concurrent server renders.
 */
export default function StoreProvider({ children }) {
  const storeRef = useRef(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

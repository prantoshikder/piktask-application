"use client";

import { useState } from "react";
import { setBaseURL } from "../helpers";

/**
 * Applies the server-fetched image base URLs during the first client render,
 * before any child component calls getBaseURL(), and mirrors them into
 * localStorage so the rest of the app keeps working exactly as it did.
 */
export default function BaseUrlScript({ urls }) {
  useState(() => {
    if (urls) setBaseURL(urls);
    return null;
  });

  return null;
}

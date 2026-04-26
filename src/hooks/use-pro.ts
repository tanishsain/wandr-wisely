import { useEffect, useState, useCallback } from "react";

const KEY = "wandr:pro";

export function usePro() {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsPro(window.localStorage.getItem(KEY) === "1");
  }, []);

  const unlock = useCallback(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, "1");
    setIsPro(true);
  }, []);

  const reset = useCallback(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(KEY);
    setIsPro(false);
  }, []);

  return { isPro, unlock, reset };
}

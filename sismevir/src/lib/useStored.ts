"use client";

import { useEffect, useState } from "react";
import { storage } from "./storage";

export function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(storage.read<T>(key, fallback));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (hydrated) storage.write(key, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, hydrated]);

  return [value, setValue, hydrated] as const;
}

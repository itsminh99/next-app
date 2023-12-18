/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";

const useEventListener = (
  eventName: string,
  handler: unknown,
  element?: any,
  id?: string,
) => {
  const savedHandler = useRef<any>();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      if (typeof window === "undefined") return;
      // Make sure element supports addEventListener
      const elementListener =
        element ?? (id ? document.getElementById(id) : window);
      const isSupported = elementListener && elementListener.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => savedHandler.current(event);
      // Add event listener

      elementListener.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        elementListener.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element, id], // Re-run if eventName or element changes
  );
};

export default useEventListener;

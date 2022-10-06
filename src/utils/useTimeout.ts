import { useEffect, useRef } from "react";

export default function useTimeout(
  callback: () => void,
  delay: number | null,
  type: "timeout" | "interval" = "timeout"
) {
  const savedCallback = useRef(callback);
  const typeRef = useRef(type);
  // Remember the latest callback if changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    if (delay === null) return;

    if (typeRef.current === "interval") {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    } else {
      const id = setTimeout(() => savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

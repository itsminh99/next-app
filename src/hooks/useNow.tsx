import { useEffect, useState } from "react";

const useNow = (timeout = 15000) => {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, timeout);

    return () => {
      clearInterval(interval);
    };
  }, [timeout]);

  return now;
};

export default useNow;

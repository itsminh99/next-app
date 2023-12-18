import { useCallback, useState } from "react";

const useToggle = (initStatus = false) => {
  const [status, setStatus] = useState<boolean>(initStatus);

  const onToggle = useCallback(() => {
    setStatus((prevStatus) => !prevStatus);
  }, []);

  const onOpen = useCallback(() => {
    setStatus(true);
  }, []);

  const onClose = useCallback(() => {
    setStatus(false);
  }, []);

  return [status, onOpen, onClose, onToggle, setStatus] as const;
};

export default useToggle;

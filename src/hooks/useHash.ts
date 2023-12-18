import { useContext } from "react";
import { HashContext } from "contexts/HashProvider";

const useHash = () => {
  const hash = useContext(HashContext);

  return hash;
};

export default useHash;

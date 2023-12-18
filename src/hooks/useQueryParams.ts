import { useMemo } from "react";
import { parseSearchParams } from "utils/index";
import { useSearchParams } from "next/navigation";

const useQueryParams = () => {
  const searchParams = useSearchParams();

  const parsedQuery = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams],
  );

  return parsedQuery;
};

export default useQueryParams;

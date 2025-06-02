import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  return { search };
};

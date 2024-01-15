import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { useContext } from "react";
import { C } from "../contexts/RootContext";
import fetchData, { FetchDataProps } from "../helpers/fetchData";

type Props = {
  queryName: string[] | string;
  url: string;
  options?: AxiosRequestConfig;
  requireAuth?: boolean;
  enabled?: boolean;
};

type UseFetchReturnType<T> = {
  data: FetchDataProps<T> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<FetchDataProps<T>, Error>>;
  isRefetching: boolean;
};

const useFetch = <T,>({
  queryName,
  url,
  options,
  requireAuth = true,
  enabled = false,
}: Props): UseFetchReturnType<T> => {
  const { user } = useContext(C);

  const cleanURL = () => {
    // insert userId to url, check if there is already a query string.
    // if requiredAuth is false, then don't add userId to url.
    if (requireAuth && user?._id) {
      const query = url.includes("?") ? "&" : "?";
      return `${url}${query}userId=${user._id}`;
    }
    return url;
  };

  const { data, isLoading, isFetching, error, refetch, isRefetching } =
    useQuery({
      queryKey: typeof queryName === "string" ? [queryName] : queryName,
      queryFn: async () => await fetchData<T>(cleanURL(), options),
      enabled: requireAuth ? !!user?._id && enabled : enabled,
    });

  return { data, isLoading, isFetching, error, refetch, isRefetching };
};

export default useFetch;

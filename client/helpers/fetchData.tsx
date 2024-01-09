import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type FetchDataProps<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
};

async function fetchData<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<FetchDataProps<T>> {
  try {
    const response: AxiosResponse<FetchDataProps<T>> = await axios(
      url,
      options
    );

    return response.data;
  } catch (error: unknown) {
    console.log({ error });
    let errorMessage = "Unknown error occurred";
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      errorMessage = `Axios request failed: ${axiosError.message}`;
    } else if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    return { success: false, data: null, error: errorMessage };
  }
}

export default fetchData;

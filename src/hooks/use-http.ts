import { useState, useCallback } from "react";

type RequestConfigType = {
  url: string;
  method?: string;
  body?: any;
  headers?: {};
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async (requestConfig: RequestConfigType, applyDataFunc?: (data: any) => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {}
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      if (data && applyDataFunc) {
        applyDataFunc(data);
      } 
      if (!applyDataFunc && data === null) {
        setError('404 Not Found');
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  };

};

export default useHttp;
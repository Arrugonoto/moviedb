import { useState } from 'react';

interface FetchTypes {
   url: Parameters<typeof fetch>[0];
   options?: Parameters<typeof fetch>[1];
}

const useFetch = <T,>(initialData: T) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<unknown>(null);
   const [data, setData] = useState<T>(initialData);
   const [lastPage, setLastPage] = useState<number>(0);

   const handleFetch = async ({ url, options }: FetchTypes): Promise<void> => {
      setLoading(true);

      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
         console.error(result);
         setError(result);
         throw new Error(`Couldn't fetch source`);
      }

      if (result.results) {
         setData(result.results);
      } else {
         setData(result);
      }

      if (result.total_pages) {
         setLastPage(result.total_pages);
      }

      setLoading(false);
   };

   return { handleFetch, loading, error, data, lastPage };
};

export default useFetch;

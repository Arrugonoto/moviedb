import { useState } from 'react';

interface FetchTypes {
   urls: string[];
   options?: Parameters<typeof fetch>[1];
}

const useFetchMany = <T,>(initialData: T) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<unknown>(null);
   const [data, setData] = useState<T[]>([initialData]);

   const handleFetchMany = async ({
      urls,
      options,
   }: FetchTypes): Promise<void> => {
      try {
         setLoading(true);

         const promises: Promise<T>[] = urls.map(async url => {
            const response = await fetch(url, options);
            if (!response.ok) {
               throw new Error(`Couldn't fetch source`);
            }
            return response.json() as Promise<T>;
         });

         const results: T[] = await Promise.all(promises);

         setData(results);
      } catch (e: unknown) {
         console.error('Error:', e);
         if (e instanceof Error) {
            setError(e);
         } else {
            setError(new Error('Service Unavailable'));
         }
      }
      setLoading(false);
   };

   return { handleFetchMany, loading, error, data };
};

export default useFetchMany;

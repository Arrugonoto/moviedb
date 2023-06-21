import { useState } from 'react';

interface PropTypes {
   url: string;
   options: {
      method: string;
      headers: {
         accept: string;
         Authorization: string;
      };
   };
}

interface MovieProps {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}

const useFetch = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>(null);
   const [data, setData] = useState<MovieProps[]>([]);
   const [lastPage, setLastPage] = useState<number>(0);

   const handleFetch = async ({ url, options }: PropTypes): Promise<void> => {
      setLoading(true);

      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
         console.error(result);
         setError(result);
         throw new Error(`Couldn't fetch source`);
      }
      setData(result.results);
      setLastPage(result.total_pages);

      setLoading(false);
   };

   return { handleFetch, loading, error, data, setData, lastPage };
};

export default useFetch;

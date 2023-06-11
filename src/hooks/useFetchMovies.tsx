import { useState, useEffect } from 'react';

type MovieProps = {
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
};

type PropTypes = {
   url: string;
   options: {
      method: string;
      headers: {
         accept: string;
         Authorization: string;
      };
   };
};
const useFetchMovies = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<any>('');
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [lastPage, setLastPage] = useState<number>(0);

   const handleFetch = async ({ url, options }: PropTypes): Promise<void> => {
      setLoading(true);

      const controller = new AbortController();
      const { signal } = controller;

      const response = await fetch(url, options);
      const result = await response.json();

      if (signal.aborted) return;
      if (!response.ok) {
         console.error(result);
         throw new Error(`Couldn't fetch source`);
      }
      console.log(result);
      setMovies(prev => [
         ...new Map([...prev, ...result.results].map(m => [m.id, m])).values(),
      ]);
      setLastPage(result.total_pages);

      setLoading(false);
      return controller.abort();
   };

   return { handleFetch, loading, error, movies, setMovies, lastPage };
};

export default useFetchMovies;

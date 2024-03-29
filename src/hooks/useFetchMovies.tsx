import { useState } from 'react';

type MovieTypes = {
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

type OptionsTypes = {
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
   const [error, setError] = useState<unknown>(null);
   const [movies, setMovies] = useState<MovieTypes[]>([]);
   const [lastPage, setLastPage] = useState<number>(0);

   const handleFetch = async ({
      url,
      options,
   }: OptionsTypes): Promise<void> => {
      setLoading(true);

      const controller = new AbortController();
      const { signal } = controller;

      const response = await fetch(url, options);
      const result = await response.json();

      if (signal.aborted) return;
      if (!response.ok) {
         console.error(result);
         setError(result);
         throw new Error(`Couldn't fetch source`);
      }
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

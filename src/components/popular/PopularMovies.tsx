import { useEffect, useRef } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { Container } from '@nextui-org/react';
import CardMdBlur from '../card/CardMdBlur';
import { motion } from 'framer-motion';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
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

const PopularMovies = () => {
   const { handleFetch, data } = useFetch<MovieProps[]>([]);
   const constraintsRef = useRef<HTMLDivElement>(null);

   const fetchMovies = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchMovies();
      // eslint-disable-next-line
   }, []);

   return (
      <Container>
         <motion.div
            ref={constraintsRef}
            style={{
               display: 'flex',
               overflowX: 'hidden',
               gap: '1.2rem',
               padding: '.5rem 1rem',
            }}
         >
            <motion.div
               drag="x"
               dragConstraints={constraintsRef}
               style={{ display: 'flex', gap: '1.2rem' }}
               dragElastic={0.1}
            >
               {data?.map(movie => (
                  <CardMdBlur
                     key={movie.id}
                     id={movie.id}
                     overview={movie.overview}
                     popularity={movie.popularity}
                     poster_path={movie.poster_path}
                     release_date={movie.release_date}
                     title={movie.title}
                     vote_average={movie.vote_average}
                     vote_count={movie.vote_count}
                  />
               ))}
            </motion.div>
         </motion.div>
      </Container>
   );
};

export default PopularMovies;

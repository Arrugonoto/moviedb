import { useEffect, PointerEvent } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { Container } from '@nextui-org/react';
import CardMdBlur from '../moviecard/CardMdBlur';
import { motion, useDragControls } from 'framer-motion';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

const TrendingMovies = () => {
   const { handleFetch, data } = useFetch();
   const controls = useDragControls();

   function startDrag(e: PointerEvent) {
      controls.start(e);
   }

   const fetchMovies = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchMovies();
   }, []);

   return (
      <Container
         display="flex"
         direction="row"
         wrap="nowrap"
         gap={0}
         css={{
            ox: 'scroll',
            py: '1rem',
            gap: '1rem',
         }}
      >
         {data.map(movie => (
            <CardMdBlur
               key={movie.id}
               id={movie.id}
               backdrop_path={movie.backdrop_path}
               original_title={movie.original_title}
               overview={movie.overview}
               popularity={movie.popularity}
               poster_path={movie.poster_path}
               release_date={movie.release_date}
               title={movie.title}
               vote_average={movie.vote_average}
               vote_count={movie.vote_count}
               onPointerDown={(e: PointerEvent) => startDrag(e)}
            />
         ))}
         {/* FIXME: pointer event needs to be fixed for framer motion*/}
         <motion.div drag="x" dragControls={controls} />
      </Container>
   );
};

export default TrendingMovies;

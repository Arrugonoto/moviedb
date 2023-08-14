import { useRef, useEffect } from 'react';
import { Container, Text } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import useFetch from '../../../hooks/useFetch';
import CardMdBlur from '../../card/CardMdBlur';
import { useParams } from 'react-router-dom';

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

const Similar = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const { movieId } = useParams();
   const { handleFetch, data } = useFetch<MovieProps[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [movieId]);

   return (
      <Container css={{ p: '0' }}>
         {data?.length > 0 ? (
            <motion.div
               ref={containerRef}
               style={{
                  display: 'flex',
                  overflowX: 'hidden',
                  gap: '1.2rem',
                  borderRadius: '.2rem',
                  padding: '0 1rem',
               }}
            >
               <motion.div
                  drag="x"
                  dragConstraints={containerRef}
                  style={{
                     display: 'flex',
                     gap: '1.2rem',
                     padding: '2rem 1.4rem',
                  }}
                  dragElastic={0.1}
               >
                  {data?.map((movie, i) => {
                     if (i < 10)
                        return (
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
                        );
                  })}
               </motion.div>
            </motion.div>
         ) : (
            <div
               style={{
                  background:
                     'linear-gradient(175deg, #9210a04c, transparent 60%)',
                  width: '80%',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 0 0.8rem 0 rgba(0, 0, 0, 0.2)',
               }}
            >
               <Text>
                  There aren't any recommended similar positions for currently
                  watched Title.
               </Text>
            </div>
         )}
      </Container>
   );
};

export default Similar;

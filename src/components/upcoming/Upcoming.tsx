import { useEffect, useRef } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { Container, Row, Text } from '@nextui-org/react';
import CardLg from '../card/CardLg';
import { motion } from 'framer-motion';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface MovieTypes {
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
   origin_country: string[];
}

const Upcoming = () => {
   const { handleFetch, data } = useFetch<MovieTypes[]>([]);
   const constraintsRef = useRef<HTMLDivElement>(null);

   const fetchMovies = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchMovies();
      // eslint-disable-next-line
   }, []);

   return (
      <section style={{ width: '100%' }}>
         <Container fluid css={{ minHeight: '24rem' }}>
            <Row>
               <Text
                  h1
                  size={26}
                  css={{
                     textGradient: '45deg, $primary 20%, $accent600 100%',
                     letterSpacing: '0.5px',
                  }}
               >
                  Upcoming Movies
               </Text>
            </Row>

            <Row css={{ br: '0.3rem' }}>
               <Container>
                  <motion.div
                     ref={constraintsRef}
                     style={{
                        display: 'flex',
                        overflowX: 'hidden',
                        gap: '1.2rem',
                     }}
                  >
                     <motion.div
                        drag="x"
                        dragConstraints={constraintsRef}
                        style={{
                           display: 'flex',
                           gap: '1.2rem',
                           padding: '.5rem 1rem',
                        }}
                        dragElastic={0.1}
                     >
                        {data?.map(movie => (
                           <CardLg
                              key={movie.id}
                              id={movie.id}
                              overview={movie.overview}
                              popularity={movie.popularity}
                              release_date={movie.release_date}
                              title={movie.title}
                              vote_average={movie.vote_average}
                              vote_count={movie.vote_count}
                              genre_ids={movie.genre_ids}
                              origin_country={movie.origin_country}
                              video={movie.video}
                              image_source={`w780${movie.backdrop_path}`}
                           />
                        ))}
                     </motion.div>
                  </motion.div>
               </Container>
            </Row>
         </Container>
      </section>
   );
};

export default Upcoming;

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Text } from '@nextui-org/react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useInfiniteFetch from '../../hooks/useInfiniteFetch';
import CardList from '../../components/card/CardList';
import { useIntersection } from '@mantine/hooks';

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
   origin_country: string[];
}

const TopRated = () => {
   const [page, setPage] = useState<number>(1);
   const { handleFetch, data } = useInfiniteFetch<MovieProps[]>([]);
   const intersectionElRef = useRef<HTMLElement>(null);

   const fetchMovies = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

      handleFetch({ url, options });
   };

   const { ref, entry } = useIntersection({
      root: intersectionElRef.current,
      threshold: 0.7,
   });

   useEffect(() => {
      fetchMovies();
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      if (page !== 1) {
         fetchMovies();
      }
      // eslint-disable-next-line
   }, [page]);

   useEffect(() => {
      if (entry?.isIntersecting && page < 5) setPage(prev => prev + 1);
      // eslint-disable-next-line
   }, [entry]);

   return (
      <section style={{ minHeight: '100dvh' }}>
         <Container fluid>
            <Row>
               <Text
                  h1
                  size={26}
                  css={{
                     textGradient: '45deg, $accent400 10%, $violet400 100%',
                     letterSpacing: '0.5px',
                  }}
               >
                  Top 100 Movies
               </Text>
            </Row>
            <Row css={{ d: 'flex', fd: 'column', gap: '1rem' }}>
               {data?.map((movie, i) => {
                  if (i === data.length - 3)
                     return (
                        <div key={movie.id} ref={ref} style={{ width: '100%' }}>
                           <CardList
                              production_id={movie.id}
                              overview={movie.overview}
                              popularity={movie.popularity}
                              poster_path={movie.poster_path}
                              release_date={movie.release_date}
                              title={movie.title}
                              vote_average={movie.vote_average}
                              vote_count={movie.vote_count}
                              genre_ids={movie.genre_ids}
                              origin_country={movie.origin_country}
                              video={movie.video}
                              index={i}
                           />
                        </div>
                     );
                  return (
                     <CardList
                        key={movie.id}
                        production_id={movie.id}
                        overview={movie.overview}
                        popularity={movie.popularity}
                        poster_path={movie.poster_path}
                        release_date={movie.release_date}
                        title={movie.title}
                        vote_average={movie.vote_average}
                        vote_count={movie.vote_count}
                        genre_ids={movie.genre_ids}
                        origin_country={movie.origin_country}
                        video={movie.video}
                        index={i}
                     />
                  );
               })}
            </Row>
         </Container>
      </section>
   );
};

export default TopRated;

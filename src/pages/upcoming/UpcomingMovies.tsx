import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { Container, Row, Text, Pagination } from '@nextui-org/react';
import { API_KEY } from '../../services/api-key';
import { METHODS } from '../../services/api';
import CardLg from '../../components/card/CardLg';

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

const UpcomingMovies = () => {
   const [page, setPage] = useState<number>(1);
   const { handleFetch, data } = useFetch<MovieProps[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.desc&with_release_type=1&release_date.gte=2023-07-17&release_date.lte=2023-08-11`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
      // eslint-disable-next-line
   }, [page]);

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, []);

   return (
      <section style={{ minHeight: '100dvh' }}>
         <Container>
            <Row>
               <Text
                  h1
                  size={26}
                  css={{
                     textGradient: '45deg, $accent400 10%, $violet400 100%',
                     letterSpacing: '0.5px',
                  }}
               >
                  Upcoming Movies
               </Text>
            </Row>
            <Row css={{ jc: 'center', p: '2rem 0' }}>
               <div
                  style={{
                     display: 'grid',
                     width: '100%',
                     placeItems: 'center',
                     gridTemplateColumns:
                        'repeat(auto-fit, minmax(24rem, 1fr))',
                     gap: '2rem',
                  }}
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
                        image_source={
                           movie.backdrop_path
                              ? `w780${movie.backdrop_path}`
                              : `w500${movie.poster_path}`
                        }
                     />
                  ))}
               </div>
            </Row>
            <Row css={{ jc: 'center' }}>
               <Pagination
                  total={500}
                  initialPage={1}
                  onChange={(page: number) => setPage(page)}
               />
            </Row>
         </Container>
      </section>
   );
};

export default UpcomingMovies;

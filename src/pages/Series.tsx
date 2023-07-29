import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { Container, Row, Text, Pagination } from '@nextui-org/react';
import { API_KEY } from '../services/api-key';
import { METHODS } from '../services/api';
import CardMdBlur from '../components/card/CardMdBlur';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface SeriesProps {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   first_air_date: string;
   name: string;
   vote_average: number;
   vote_count: number;
   media_type: string;
   origin_country: string[];
}

const Series = () => {
   const [page, setPage] = useState<number>(1);
   const { handleFetch, data } = useFetch<SeriesProps[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/discover/tv?page=${page}`;

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
                  TV Shows
               </Text>
            </Row>
            <Row css={{ jc: 'center', p: '2rem 0' }}>
               <div
                  style={{
                     display: 'grid',
                     width: '90%',
                     placeItems: 'center',
                     gridTemplateColumns:
                        'repeat(auto-fit, minmax(12rem, 1fr))',
                     gap: '2rem',
                  }}
               >
                  {data?.map(series => (
                     <CardMdBlur
                        key={series.id}
                        id={series.id}
                        overview={series.overview}
                        popularity={series.popularity}
                        poster_path={series.poster_path}
                        release_date={series.first_air_date}
                        name={series.name}
                        vote_average={series.vote_average}
                        vote_count={series.vote_count}
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

export default Series;

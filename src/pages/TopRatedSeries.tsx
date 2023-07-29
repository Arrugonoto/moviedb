import { useState, useEffect, useRef } from 'react';
import { Container, Row, Text } from '@nextui-org/react';
import { METHODS } from '../services/api';
import { API_KEY } from '../services/api-key';
import useInfiniteFetch from '../hooks/useInfiniteFetch';
import CardList from '../components/card/CardList';
import { useIntersection } from '@mantine/hooks';

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

const TopRatedSeries = () => {
   const [page, setPage] = useState<number>(1);
   const { handleFetch, data } = useInfiniteFetch<SeriesProps[]>([]);
   const intersectionElRef = useRef<HTMLElement>(null);

   const fetchSeries = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;

      handleFetch({ url, options });
   };

   const { ref, entry } = useIntersection({
      root: intersectionElRef.current,
      threshold: 0.7,
   });

   useEffect(() => {
      fetchSeries();
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      if (page !== 1) {
         fetchSeries();
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
                  Top 100 TV Shows
               </Text>
            </Row>
            <Row css={{ d: 'flex', fd: 'column', gap: '1rem' }}>
               {data?.map((series, i) => {
                  if (i === data.length - 3)
                     return (
                        <div
                           key={series.id}
                           ref={ref}
                           style={{ width: '100%' }}
                        >
                           <CardList
                              production_id={series.id}
                              overview={series.overview}
                              popularity={series.popularity}
                              poster_path={series.poster_path}
                              release_date={series.first_air_date}
                              name={series.name}
                              vote_average={series.vote_average}
                              vote_count={series.vote_count}
                              genre_ids={series.genre_ids}
                              origin_country={series.origin_country}
                              index={i}
                           />
                        </div>
                     );
                  return (
                     <CardList
                        key={series.id}
                        production_id={series.id}
                        overview={series.overview}
                        popularity={series.popularity}
                        poster_path={series.poster_path}
                        release_date={series.first_air_date}
                        name={series.name}
                        vote_average={series.vote_average}
                        vote_count={series.vote_count}
                        genre_ids={series.genre_ids}
                        origin_country={series.origin_country}
                        index={i}
                     />
                  );
               })}
            </Row>
         </Container>
      </section>
   );
};

export default TopRatedSeries;

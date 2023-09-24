import { useEffect, useRef } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { Container } from '@nextui-org/react';
import CardLgAnimated from '../card/CardLgAnimated';
import { motion } from 'framer-motion';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface SeriesTypes {
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
   const { handleFetch, data } = useFetch<SeriesTypes[]>([]);
   const constraintsRef = useRef<HTMLDivElement>(null);

   const fetchSeries = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchSeries();
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
            }}
         >
            <motion.div
               drag="x"
               dragConstraints={constraintsRef}
               style={{
                  display: 'flex',
                  gap: '1.2rem',
                  width: '300rem',
                  padding: '.5rem 1rem',
               }}
               dragElastic={0.1}
            >
               {data?.map(series => (
                  <CardLgAnimated
                     key={series.id}
                     id={series.id}
                     overview={series.overview}
                     popularity={series.popularity}
                     poster_path={series.poster_path}
                     first_air_date={series.first_air_date}
                     name={series.name}
                     vote_average={series.vote_average}
                     vote_count={series.vote_count}
                     genre_ids={series.genre_ids}
                     origin_country={series.origin_country}
                  />
               ))}
            </motion.div>
         </motion.div>
      </Container>
   );
};

export default TopRatedSeries;

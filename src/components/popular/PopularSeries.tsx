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

const PopularSeries = () => {
   const { handleFetch, data } = useFetch<SeriesProps[]>([]);
   const constraintsRef = useRef<HTMLDivElement>(null);

   const fetchSeries = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;

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
               padding: '2rem 1.4rem',
               background: 'rgba(146, 16, 160, 0.8)',
               borderRadius: '.2rem',
            }}
         >
            <motion.div
               drag="x"
               dragConstraints={constraintsRef}
               style={{ display: 'flex', gap: '1.2rem' }}
               dragElastic={0.1}
            >
               {data?.map(series => (
                  <CardMdBlur
                     key={series.id}
                     id={series.id}
                     overview={series.overview}
                     popularity={series.popularity}
                     poster_path={series.poster_path}
                     first_air_date={series.first_air_date}
                     name={series.name}
                     vote_average={series.vote_average}
                     vote_count={series.vote_count}
                  />
               ))}
            </motion.div>
         </motion.div>
      </Container>
   );
};

export default PopularSeries;

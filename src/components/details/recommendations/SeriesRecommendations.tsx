import { useRef, useEffect } from 'react';
import { Container, Text, Row } from '@nextui-org/react';
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

interface SeriesTypes {
   adult: boolean;
   backdrop_path: string;
   id: number;
   name: string;
   original_language: string;
   original_name: string;
   overview: string;
   poster_path: string;
   media_type: string;
   genre_ids: number[];
   popularity: number;
   first_air_date: string;
   vote_average: number;
   vote_count: number;
   origin_country: string[];
}

const SeriesRecommendations = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const { tvShowId } = useParams();
   const { handleFetch, data } = useFetch<SeriesTypes[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?language=en-US&page=1`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [tvShowId]);

   return (
      <Container css={{ d: 'flex', fd: 'column', p: '1rem 0' }}>
         <Row>
            <Text
               h3
               css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
            >
               Recommendations
            </Text>
         </Row>
         <Row css={{ p: '0' }}>
            {data?.length > 0 ? (
               <motion.div
                  ref={containerRef}
                  style={{
                     display: 'flex',
                     overflowX: 'hidden',
                     borderRadius: '.2rem',
                  }}
               >
                  <motion.div
                     drag="x"
                     dragConstraints={containerRef}
                     style={{
                        display: 'flex',
                        gap: '1.2rem',
                        padding: '1.4rem',
                     }}
                     dragElastic={0.1}
                  >
                     {data?.map((series, i) => {
                        if (i < 10)
                           return (
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
                     There aren't any recommendations for watched Title for now.
                  </Text>
               </div>
            )}
         </Row>
      </Container>
   );
};

export default SeriesRecommendations;

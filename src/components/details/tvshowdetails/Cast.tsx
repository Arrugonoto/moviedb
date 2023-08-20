import { useRef, useEffect } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import CardPersonCast from '../../card/CardPersonCast';
import { useParams, Link } from 'react-router-dom';
import ROUTES from '../../../routes/routes';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import useFetch from '../../../hooks/useFetch';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface CreditsTypes {
   cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      character: string;
      credit_id: string;
      order: number;
   }[];
   crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
   }[];
}

const Cast = () => {
   const castContainerRef = useRef<HTMLDivElement>(null);
   const { tvShowId, tvShowTitle } = useParams();
   const { handleFetch, data } = useFetch<CreditsTypes>({} as CreditsTypes);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/tv/${tvShowId}/credits?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [tvShowId]);

   return (
      <Container css={{ d: 'flex', fd: 'column', p: '0' }}>
         <Text
            h3
            css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
         >
            Cast
         </Text>
         <Row>
            <motion.div
               ref={castContainerRef}
               style={{
                  display: 'flex',
                  overflowX: 'hidden',
                  cursor: 'grab',
               }}
            >
               <motion.div
                  drag="x"
                  dragConstraints={castContainerRef}
                  style={{ display: 'flex', gap: '1rem', padding: '1rem' }}
                  dragElastic={0.1}
                  dragPropagation={true}
               >
                  <div style={{ display: 'flex', gap: '1.2rem' }}>
                     {data?.cast?.map(person => {
                        if (data?.cast?.indexOf(person) < 12)
                           return (
                              <CardPersonCast key={person.id} person={person} />
                           );
                     })}
                  </div>
                  <div
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'default',
                     }}
                  >
                     <Link
                        to={`/${ROUTES.SERIES_DETAILS}/${tvShowTitle}/${tvShowId}/cast-and-crew`}
                     >
                        <Button
                           css={{
                              bc: 'transparent',
                           }}
                        >
                           <Text
                              css={{
                                 '&:hover': {
                                    color: '#9210a0',
                                    tdl: 'underline',
                                 },
                              }}
                           >
                              Show entire Cast & Crew
                           </Text>
                        </Button>
                     </Link>
                  </div>
               </motion.div>
            </motion.div>
         </Row>
         <Row css={{ d: 'flex', jc: 'center' }}>
            <Link
               to={`/${ROUTES.SERIES_DETAILS}/${tvShowTitle}/${tvShowId}/cast-and-crew`}
            >
               <Button ghost color="primary">
                  Show entire Cast & Crew
               </Button>
            </Link>
         </Row>
      </Container>
   );
};

export default Cast;

import { useRef } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import CardPersonCast from '../../card/CardPersonCast';
import { Link, useParams } from 'react-router-dom';
import ROUTES from '../../../routes/routes';

interface CastProps {
   cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
   }[];
}

const Cast = ({ cast }: CastProps) => {
   const castContainerRef = useRef<HTMLDivElement>(null);
   const { movieTitle, movieId } = useParams();

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
                     {cast?.map(person => {
                        if (cast?.indexOf(person) < 12)
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
                        to={`/${ROUTES.MOVIE_DETAILS}/${movieTitle}/${movieId}/cast-and-crew`}
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
               to={`/${ROUTES.MOVIE_DETAILS}/${movieTitle}/${movieId}/cast-and-crew`}
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

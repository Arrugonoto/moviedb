import { Container, Row, Text, Button } from '@nextui-org/react';
import CardFilmography from '../../card/CardFilmography';

interface PropTypes {
   cast: {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date?: string;
      title?: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
      character: string;
      credit_id: string;
      order: number;
      media_type: string;
      origin_country: string[];
      original_name: string;
      first_air_date?: string;
      name?: string;
      episode_count?: number;
   }[];
}

const Cast = ({ cast }: PropTypes) => {
   const sortedProductions = cast?.sort((curr, next) => {
      const currDate = curr?.release_date || curr?.first_air_date;
      const nextDate = next?.release_date || next?.first_air_date;

      if (!currDate && !nextDate) return 0;
      if (!currDate) return -1;
      if (!nextDate) return 1;

      return new Date(nextDate).getTime() - new Date(currDate).getTime();
   });

   return (
      <Container css={{ width: '80%', m: '0 0 1rem 0' }}>
         <Row css={{ marginBottom: '0.5rem' }}>
            <Text
               h3
               css={{
                  fontSize: '1.3rem',
                  borderBottom: '3px solid #9210A0',
               }}
            >
               Actor
            </Text>
         </Row>
         <Row css={{ d: 'flex', fd: 'column', gap: '1rem' }}>
            {sortedProductions?.map(production => {
               if (sortedProductions?.indexOf(production) < 20)
                  return (
                     // key={production?.credit_id}
                     <CardFilmography
                        key={production?.credit_id}
                        production={production}
                        lastElement={
                           sortedProductions?.indexOf(production) === 19 ||
                           sortedProductions?.indexOf(production) ===
                              sortedProductions?.length - 1
                        }
                     />
                  );
            })}
            {sortedProductions?.length > 19 && (
               <Row css={{ jc: 'center', paddingBottom: '1rem' }}>
                  <Button ghost>View acting history</Button>
               </Row>
            )}
         </Row>
      </Container>
   );
};

export default Cast;

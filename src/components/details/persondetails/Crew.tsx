import { Container, Row, Text } from '@nextui-org/react';
import CardFilmography from '../../card/CardFilmography';

interface PropTypes {
   crew: {
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
      title?: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
      credit_id: string;
      department: string;
      job: string;
      media_type: string;
      origin_country: string[];
      original_name: string;
      first_air_date: string;
      name?: string;
      episode_count: number;
   }[];
}

const Crew = ({ crew }: PropTypes) => {
   const producer = crew?.filter(
      production => production.department === 'Production'
   );
   const director = crew?.filter(
      production => production.department === 'Directing'
   );
   const writer = crew?.filter(
      production => production.department === 'Writing'
   );

   const producerSorted = producer?.sort((curr, next) => {
      const currDate = curr?.release_date || curr?.first_air_date;
      const nextDate = next?.release_date || next?.first_air_date;

      if (!currDate && !nextDate) return 0;
      if (!currDate) return -1;
      if (!nextDate) return 1;

      return new Date(nextDate).getTime() - new Date(currDate).getTime();
   });

   const directorSorted = director?.sort((curr, next) => {
      const currDate = curr?.release_date || curr?.first_air_date;
      const nextDate = next?.release_date || next?.first_air_date;

      if (!currDate && !nextDate) return 0;
      if (!currDate) return -1;
      if (!nextDate) return 1;

      return new Date(nextDate).getTime() - new Date(currDate).getTime();
   });

   const writerSorted = writer?.sort((curr, next) => {
      const currDate = curr?.release_date || curr?.first_air_date;
      const nextDate = next?.release_date || next?.first_air_date;

      if (!currDate && !nextDate) return 0;
      if (!currDate) return -1;
      if (!nextDate) return 1;

      return new Date(nextDate).getTime() - new Date(currDate).getTime();
   });

   return (
      <Container
         css={{ d: 'flex', fd: 'column', width: '80%', gap: '2rem', m: '0' }}
      >
         {producer?.length > 0 && (
            <Row css={{ fd: 'column', marginTop: '1rem' }}>
               <Row css={{ marginBottom: '0.5rem' }}>
                  <Text
                     h3
                     css={{
                        fontSize: '1.3rem',
                        borderBottom: '3px solid #9210A0',
                     }}
                  >
                     Producer
                  </Text>
               </Row>
               <Row css={{ fd: ' column', gap: '1rem' }}>
                  {producerSorted?.map(production => (
                     <CardFilmography
                        key={production?.credit_id}
                        production={production}
                        lastElement={
                           producerSorted?.indexOf(production) ===
                           producerSorted?.length - 1
                        }
                     />
                  ))}
               </Row>
            </Row>
         )}

         {director?.length > 0 && (
            <Row css={{ fd: 'column', marginTop: ' 1rem' }}>
               <Row css={{ marginBottom: '0.5rem' }}>
                  <Text
                     h3
                     css={{
                        fontSize: '1.3rem',
                        borderBottom: '3px solid #9210A0',
                     }}
                  >
                     Director
                  </Text>
               </Row>
               <Row css={{ fd: ' column', gap: '1rem' }}>
                  {directorSorted?.map(production => (
                     <CardFilmography
                        key={production?.credit_id}
                        production={production}
                        lastElement={
                           directorSorted?.indexOf(production) ===
                           directorSorted?.length - 1
                        }
                     />
                  ))}
               </Row>
            </Row>
         )}

         {writer?.length > 0 && (
            <Row css={{ fd: 'column', marginTop: ' 1rem' }}>
               <Row css={{ marginBottom: '0.5rem' }}>
                  <Text
                     h3
                     css={{
                        fontSize: '1.3rem',
                        borderBottom: '3px solid #9210A0',
                     }}
                  >
                     Writer
                  </Text>
               </Row>
               <Row css={{ fd: ' column', gap: '1rem' }}>
                  {writerSorted?.map(production => (
                     <CardFilmography
                        key={production?.credit_id}
                        production={production}
                        lastElement={
                           writerSorted?.indexOf(production) ===
                           writerSorted?.length - 1
                        }
                     />
                  ))}
               </Row>
            </Row>
         )}
      </Container>
   );
};

export default Crew;

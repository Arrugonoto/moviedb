import { Container, Row, Text, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../../data/imageConfig';

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
      <Container>
         <Row>
            <Text>Acting</Text>
         </Row>
         <Row css={{ d: 'flex', fd: 'column' }}>
            {sortedProductions?.map(production => (
               <article
                  key={production?.credit_id}
                  style={{ display: 'flex', gap: '1rem' }}
               >
                  <div style={{ width: '6rem' }}>
                     <Image
                        src={`${BASE_URL}${IMAGE_SIZE.POSTER.W342}/${production.poster_path}`}
                        objectFit="cover"
                        width="100%"
                        loading="lazy"
                        alt="Production Poster"
                     />
                  </div>
                  <div>
                     <Text>
                        {production?.title
                           ? production?.title
                           : production?.name}
                     </Text>
                     <Text>
                        {production?.release_date
                           ? production?.release_date?.slice(0, 4)
                           : production?.first_air_date?.slice(0, 4)}
                     </Text>
                  </div>
               </article>
            ))}
         </Row>
      </Container>
   );
};

export default Cast;

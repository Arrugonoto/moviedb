import { Container, Row, Text, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../../data/imageConfig';
import { BiSolidStar } from 'react-icons/bi';

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
         <Row css={{ marginBottom: '2rem' }}>
            <Text h3 css={{ fontSize: '1.3rem' }}>
               Acting
            </Text>
         </Row>
         <Row css={{ d: 'flex', fd: 'column', gap: '1rem' }}>
            {sortedProductions?.map(production => (
               <article
                  key={production?.credit_id}
                  style={{
                     display: 'flex',
                     width: '80%',
                     gap: '1rem',
                     minHeight: '7rem',
                     paddingBottom: '1rem',
                     borderBottom: '1px solid rgba(180,180,180, 0.5)',
                  }}
               >
                  <div
                     style={{
                        minWidth: '5rem',
                        width: '5rem',
                        borderRadius: '0.1rem',
                        overflow: 'hidden',
                     }}
                  >
                     {production?.poster_path ? (
                        <Image
                           src={`${BASE_URL}${IMAGE_SIZE.POSTER.W342}/${production.poster_path}`}
                           objectFit="cover"
                           width="100%"
                           loading="lazy"
                           alt="Production Poster"
                        />
                     ) : (
                        <div
                           style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'rgba(180,180,180, 0.3)',
                           }}
                        ></div>
                     )}
                  </div>
                  <div
                     style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                     }}
                  >
                     <div
                        style={{
                           display: 'flex',
                           flexDirection: 'column',
                           justifyContent: 'space-between',
                        }}
                     >
                        <Row css={{ fd: 'column' }}>
                           <Row>
                              <Text
                                 h4
                                 css={{
                                    fontFamily: 'Roboto',
                                    fontSize: '1rem',
                                    letterSpacing: '0.1px',
                                 }}
                              >
                                 {production?.title
                                    ? production?.title
                                    : production?.name}
                              </Text>
                           </Row>
                           <Row
                              style={{ display: 'flex', alignItems: 'center' }}
                           >
                              <BiSolidStar
                                 style={{
                                    fontSize: '1.1rem',
                                    color: '#9210A0',
                                 }}
                              />
                              <Text css={{ fontSize: '1.1rem' }}>
                                 {production?.vote_average?.toFixed(1)}
                              </Text>
                           </Row>
                        </Row>
                        <Row css={{ gap: '0.2rem' }}>
                           <Text>{`${production?.character}`}</Text>
                           {production?.episode_count && (
                              <Text css={{ opacity: 0.8 }}>
                                 {`(${production?.episode_count} ${
                                    production?.episode_count > 1
                                       ? 'episodes'
                                       : 'episode'
                                 })`}
                              </Text>
                           )}
                        </Row>
                     </div>
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                        }}
                     >
                        <Text css={{ fontSize: '1.2rem' }}>
                           {production?.release_date
                              ? production?.release_date?.slice(0, 4)
                              : production?.first_air_date?.slice(0, 4)}
                        </Text>
                     </div>
                  </div>
               </article>
            ))}
         </Row>
      </Container>
   );
};

export default Cast;

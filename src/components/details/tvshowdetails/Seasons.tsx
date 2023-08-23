import { Container, Text, Row, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../../data/imageConfig';
import { Link } from 'react-router-dom';
import { BiSolidMovie, BiSolidStar } from 'react-icons/bi';

interface PropTypes {
   seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
   }[];
}

const Seasons = ({ seasons }: PropTypes) => {
   return (
      <Container css={{ d: 'flex', fd: 'column', p: '0 0 3rem 0' }}>
         <Text
            h3
            css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
         >
            Seasons
         </Text>
         <Row css={{ p: '1rem', gap: '2rem', overflowX: 'scroll' }}>
            {seasons?.map(season => (
               <article
                  key={season?.id}
                  title={season?.overview}
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               >
                  <Row
                     css={{
                        width: '10rem',
                        borderRadius: '.4rem',
                        overflow: 'hidden',
                     }}
                  >
                     <Link to={``}>
                        <Image
                           src={`${BASE_URL}${IMAGE_SIZE.POSTER.W342}/${season?.poster_path}`}
                           alt="Tv Show Poster"
                           objectFit="cover"
                           css={{
                              transition: '.2s all linear',
                              '&:hover': {
                                 scale: 1.3,
                              },
                           }}
                        />
                     </Link>
                  </Row>
                  <Link to={``}>
                     <Text
                        css={{
                           w: '100%',
                           fontFamily: 'Roboto',
                           fontWeight: '500',
                           letterSpacing: '0.1px',
                           textAlign: ' center',
                           '&:hover': {
                              textDecoration: 'underline',
                              color: '#9210A0',
                           },
                        }}
                     >
                        {season?.name}
                     </Text>
                  </Link>

                  <Row css={{ jc: 'center', gap: '1rem' }}>
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '.1rem',
                        }}
                     >
                        <BiSolidStar
                           style={{ fontSize: '1.2rem', color: '#9210A0' }}
                        />
                        <Text>{season?.vote_average}</Text>
                     </div>
                     <div
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           gap: '.1rem',
                        }}
                     >
                        <BiSolidMovie
                           style={{ fontSize: '1.2rem', color: '#9210A0' }}
                        />
                        <Text>
                           {season?.episode_count}
                           {season?.episode_count > 1
                              ? ' episodes'
                              : ' episode'}
                        </Text>
                     </div>
                  </Row>
               </article>
            ))}
         </Row>
      </Container>
   );
};

export default Seasons;

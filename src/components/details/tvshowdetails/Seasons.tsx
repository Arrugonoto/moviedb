import { Container, Text, Row, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../../data/imageConfig';
import { Link } from 'react-router-dom';
import { BiSolidMovie, BiSolidStar, BiMovie } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import ROUTES from '../../../routes/routes';

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
   const { tvShowId, tvShowTitle } = useParams();

   return (
      <Container css={{ d: 'flex', fd: 'column', p: '0 0 3rem 0' }}>
         <Text
            h3
            css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
         >
            Seasons
         </Text>
         <Row css={{ p: '1rem', gap: '1.5rem', overflowX: 'scroll' }}>
            {seasons?.map(season => (
               <article
                  key={season?.id}
                  title={season?.overview}
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     width: '12rem',
                     gap: '0.5rem',
                  }}
               >
                  <Row
                     css={{
                        width: '11rem',
                        height: '16rem',
                        borderRadius: '.4rem',
                        overflow: 'hidden',
                     }}
                  >
                     {season?.poster_path ? (
                        <Link
                           to={`/${ROUTES.SERIES_DETAILS}/${tvShowTitle}/${tvShowId}/season/${season?.season_number}`}
                        >
                           <Image
                              src={`${BASE_URL}${IMAGE_SIZE.POSTER.W342}/${season?.poster_path}`}
                              alt="Tv Show Poster"
                              objectFit="cover"
                              css={{
                                 transition: 'all .2s linear',
                                 '&:hover': {
                                    scale: 1.2,
                                 },
                              }}
                           />
                        </Link>
                     ) : (
                        <div
                           style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'rgba(150, 150, 150, 0.3)',
                           }}
                        >
                           <BiMovie
                              style={{
                                 fontSize: '6rem',
                                 color: 'rgba(146, 16, 160, 0.8)',
                              }}
                           />
                        </div>
                     )}
                  </Row>

                  <Link
                     to={`/${ROUTES.SERIES_DETAILS}/${tvShowTitle}/${tvShowId}/season/${season?.season_number}`}
                     title={season?.name}
                  >
                     <Text
                        css={{
                           w: '100%',
                           fontFamily: 'Roboto',
                           fontWeight: '500',
                           letterSpacing: '0.1px',
                           textAlign: ' center',
                           truncateText: '100%',
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
                        <Text css={{ fontWeight: '600' }}>
                           {season?.vote_average}
                        </Text>
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
                        <Text css={{ fontWeight: '600' }}>
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

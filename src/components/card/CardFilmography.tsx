import { Row, Text, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import { BiSolidStar } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import { MdLocalMovies } from 'react-icons/md';

interface PropTypes {
   production: {
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
      character?: string;
      credit_id: string;
      order?: number;
      media_type: string;
      origin_country: string[];
      original_name: string;
      first_air_date?: string;
      name?: string;
      episode_count?: number;
      department?: string;
      job?: string;
   };
   lastElement: boolean;
}

const CardFilmography = ({ production, lastElement }: PropTypes) => {
   const titleRegex = /:|,|\./g;
   const movieTitle: string = (production?.name ?? production?.title) as string;
   const productionTitle: string = movieTitle
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(titleRegex, '');

   return (
      <article
         style={{
            display: 'flex',
            gap: '1rem',
            minHeight: '7rem',
            paddingBottom: '1rem',
            borderBottom: `1px solid ${
               lastElement ? 'transparent' : 'rgba(180,180,180, 0.3)'
            }`,
            width: '100%',
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
            <Link
               to={
                  production?.title
                     ? `/${ROUTES.MOVIE_DETAILS}/${productionTitle}/${production.id}`
                     : `/${ROUTES.SERIES_DETAILS}/${productionTitle}/${production.id}`
               }
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
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(180,180,180, 0.3)',
                     }}
                  >
                     <MdLocalMovies
                        style={{ fontSize: '2.6rem', color: '#9210A0' }}
                     />
                  </div>
               )}
            </Link>
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
                     <Link
                        to={
                           production?.title
                              ? `/${ROUTES.MOVIE_DETAILS}/${productionTitle}/${production.id}`
                              : `/${ROUTES.SERIES_DETAILS}/${productionTitle}/${production.id}`
                        }
                     >
                        <Text
                           h4
                           css={{
                              fontFamily: 'Roboto',
                              fontSize: '1rem',
                              letterSpacing: '0.1px',
                              '&:hover': {
                                 textDecoration: 'underline',
                                 color: '#9210A0',
                              },
                           }}
                        >
                           {production?.title
                              ? production?.title
                              : production?.name}
                        </Text>
                     </Link>
                  </Row>
                  <Row
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                     }}
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
               {!production?.department && (
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
               )}
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
   );
};

export default CardFilmography;

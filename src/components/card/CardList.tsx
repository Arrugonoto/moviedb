import { ReactElement } from 'react';
import { Col, Text, Row, Image, useTheme } from '@nextui-org/react';
import style from './cardList.module.css';
import { GENRES, SERIES_GENRES } from '../../data/genres';
import { FaCalendar } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';

interface PropTypes {
   backdrop_path?: string;
   genre_ids: number[];
   production_id: number;
   original_title?: string;
   original_name?: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   first_air_date?: string;
   title: string;
   name: string;
   origin_country: string[];
   video?: boolean;
   vote_average: number;
   vote_count: number;
   index: number;
}

const lookupMovieGenre: { [id: number]: string } = {};
GENRES.forEach(el => {
   lookupMovieGenre[el.id] = el.name;
});

const lookupSeriesGenre: { [id: number]: string } = {};
SERIES_GENRES.forEach(el => {
   lookupSeriesGenre[el.id] = el.name;
});

const CardList = ({
   poster_path,
   backdrop_path,
   release_date,
   production_id,
   first_air_date,
   name,
   title,
   vote_average,
   genre_ids,
   index,
}: PropTypes): ReactElement => {
   const { isDark } = useTheme();
   const navigate = useNavigate();
   const titleRegex = /:|,|\./g;
   const movieTitle: string = name ?? title;
   const replacedTitle: string = movieTitle
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(titleRegex, '');

   const handleRedirect = () => {
      if (name) {
         navigate(
            `/${ROUTES.SERIES_DETAILS}/${replacedTitle}/${production_id}`
         );
      } else {
         navigate(`/${ROUTES.MOVIE_DETAILS}/${replacedTitle}/${production_id}`);
      }
   };

   return (
      <article className={style.cardContainer} onClick={() => handleRedirect()}>
         <Row css={{ w: '100%', height: '9rem' }}>
            <Col css={{ w: 'min-content', cursor: 'pointer' }}>
               <Image
                  src={`https://image.tmdb.org/t/p/w400${
                     poster_path ?? backdrop_path
                  }`}
                  objectFit="cover"
                  alt="Movie poster"
                  width="6rem"
                  title={title ? title : name}
               />
            </Col>
            <Col
               css={{
                  d: 'flex',
                  fd: 'column',
                  w: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  p: '0 0 0 1rem',
                  gap: '2rem',
               }}
            >
               <Row css={{ fd: 'column' }}>
                  <Text
                     size={17}
                     css={{
                        fontWeight: '600',
                        letterSpacing: '0.05px',
                        truncateText: '100%',
                        cursor: 'pointer',
                        '&:hover': {
                           tdl: 'underline',
                           color: '#9210a0',
                        },
                     }}
                     title={title ? title : name}
                  >
                     {title
                        ? `${index + 1}. ${title}`
                        : `${index + 1}. ${name}`}
                  </Text>
                  <div>
                     <Text
                        css={{
                           fontFamily: 'Roboto',
                           bc: `${
                              isDark
                                 ? 'rgba(80, 80, 80, 0.5)'
                                 : 'rgba(40, 40, 40, 0.1)'
                           }`,
                           border: '1px solid #000000',
                           p: '0 0.4rem',
                           br: '0.5rem',
                           fontSize: '0.8rem',
                        }}
                        title="Release date"
                     >
                        <FaCalendar
                           style={{ marginRight: '0.2rem', fontSize: '0.7rem' }}
                        />
                        {release_date
                           ? release_date?.slice(0, 4)
                           : first_air_date?.slice(0, 4)}
                     </Text>
                  </div>
               </Row>
               <Row align="flex-start" wrap="wrap" css={{ gap: '0.4rem' }}>
                  {genre_ids?.map(id => (
                     <p
                        key={id}
                        style={{
                           color: '#ffffff',
                           borderRadius: '0.4rem',
                           border: '1px solid #9210A0',
                           padding: '0 .4rem',
                           backgroundColor: `${
                              isDark
                                 ? 'rgba(146, 16, 160, 0.5)'
                                 : 'rgba(115, 11, 137, 0.8)'
                           }`,
                           fontSize: '0.8rem',
                           fontFamily: 'Roboto',
                           letterSpacing: '0.1px',
                           cursor: 'pointer',
                        }}
                     >
                        {name ? lookupSeriesGenre[id] : lookupMovieGenre[id]}
                     </p>
                  ))}
               </Row>
            </Col>
            <Col
               css={{
                  d: 'flex',
                  width: '30%',
                  height: '100%',
                  jc: 'center',
                  ai: 'center',
               }}
               title={vote_average > 0 ? 'Average rating' : 'Unrated'}
            >
               <div
                  style={{
                     display: 'flex',
                     gap: '.3rem',
                  }}
               >
                  <FaStar
                     style={{
                        fontSize: '2rem',
                        color: `${index === 0 ? '#f1ee13' : '#9210A0'}`,
                     }}
                  />
                  <Text
                     size={20}
                     css={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: '500',
                     }}
                  >
                     {vote_average > 0 ? vote_average : 'UN'}
                  </Text>
               </div>
            </Col>
         </Row>
      </article>
   );
};

export default CardList;

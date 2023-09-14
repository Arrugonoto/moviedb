import { ReactElement } from 'react';
import { Card, Text, Col, Row, useTheme } from '@nextui-org/react';
import { FaImage } from 'react-icons/fa';
import style from './movieCard.module.css';
import { motion } from 'framer-motion';
import { GENRES, SERIES_GENRES } from '../../data/genres';
import { FaLocationDot, FaCalendar } from 'react-icons/fa6';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';

interface PropTypes {
   genre_ids: number[];
   id: number;
   original_title?: string;
   original_name?: string;
   overview: string;
   popularity: number;
   release_date: string;
   first_air_date?: string;
   title?: string;
   name?: string;
   origin_country: string[];
   video?: boolean;
   vote_average: number;
   vote_count: number;
   image_source?: string;
}

const overwiewMotion = {
   rest: {
      opacity: 0,
   },
   hover: {
      opacity: 1,
      translate: '0 -10px',
   },
};

const overwiewBgMotion = {
   rest: {
      opacity: 0,
   },
   hover: {
      opacity: 1,
   },
};

const lookupMovieGenre: { [id: number]: string } = {};
GENRES.forEach(el => {
   lookupMovieGenre[el.id] = el.name;
});

const lookupSeriesGenre: { [id: number]: string } = {};
SERIES_GENRES.forEach(el => {
   lookupSeriesGenre[el.id] = el.name;
});

const CardLg = ({
   id,
   overview,
   popularity,
   release_date,
   name,
   title,
   vote_average,
   vote_count,
   genre_ids,
   origin_country,
   image_source,
}: PropTypes): ReactElement => {
   const { isDark } = useTheme();
   const titleRegex = /:|,|\./g;
   const movieTitle: string = (name ?? title) as string;
   const replacedTitle: string = movieTitle
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(titleRegex, '');

   return (
      <motion.article
         style={{
            minWidth: '10rem',
            width: '24rem',
            flex: 1,
            height: '18rem',
            borderRadius: '0.3rem',
            overflow: 'hidden',
         }}
         initial="rest"
         whileHover="hover"
         animate="initial"
         transition={{ delay: 0.35 }}
      >
         <Card
            isPressable
            allowTextSelectionOnPress={true}
            css={{
               w: '100%',
               h: '100%',
               br: '0.3rem',
            }}
            className={style.card}
         >
            <Card.Body css={{ p: '0', ov: 'hidden' }}>
               {image_source ? (
                  <Card.Image
                     src={`https://image.tmdb.org/t/p/${image_source}`}
                     loading="lazy"
                     width="100%"
                     height="100%"
                     objectFit="cover"
                     alt="Movie poster"
                  />
               ) : (
                  <Col
                     css={{
                        d: 'flex',
                        fd: ' column',
                        w: '100%',
                        h: '100%',
                        jc: 'center',
                        ai: 'center',
                        bc: 'rgba(176, 240, 251, .2)',
                        gap: '.5rem',
                     }}
                  >
                     <Text>No Image Available</Text>
                     <FaImage style={{ fontSize: '2rem' }} />
                  </Col>
               )}
               <motion.div
                  style={{
                     position: 'absolute',
                     width: '100%',
                     height: '100%',
                     background: `${
                        isDark
                           ? 'linear-gradient(0deg,#000000, transparent)'
                           : 'linear-gradient(0deg,#ffffff, transparent)'
                     }`,
                     backdropFilter: 'blur(4px)',
                  }}
                  variants={overwiewBgMotion}
               >
                  <motion.p
                     style={{
                        position: 'absolute',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: '3',
                        textOverflow: 'ellipsis',
                        bottom: '20%',
                        padding: '0 1rem',
                     }}
                     variants={overwiewMotion}
                     title={overview}
                  >
                     {overview}
                  </motion.p>
               </motion.div>

               <motion.div
                  style={{
                     position: 'absolute',
                     display: 'flex',
                     bottom: '5rem',
                     gap: '0.3rem',
                     padding: '0 0.3rem',
                     flexWrap: 'wrap',
                  }}
                  variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
               >
                  {genre_ids.map(id => (
                     <p
                        key={id}
                        style={{
                           color: '#ffffff',
                           borderRadius: '0.4rem',
                           border: '1px solid #9210A0',
                           padding: '0 .4rem',
                           backgroundColor: 'rgba(45, 3, 76, 0.7)',
                           fontSize: '0.9rem',
                           fontFamily: 'Roboto',
                           letterSpacing: '0.1px',
                        }}
                     >
                        {title ? lookupMovieGenre[id] : lookupSeriesGenre[id]}
                     </p>
                  ))}
                  <Row css={{ gap: '.3rem' }}>
                     <Text
                        css={{
                           fontFamily: 'Roboto',
                           color: '#F1F3FE',
                           bc: '#141414cc',
                           border: '1px solid #000000',
                           p: '0 0.6rem',
                           br: '0.5rem',
                           fontSize: '0.9rem',
                        }}
                        title="Release date"
                     >
                        <FaCalendar
                           style={{ marginRight: '0.2rem', fontSize: '0.8rem' }}
                        />
                        {format(new Date(release_date), 'd MMM yyyy')}
                     </Text>
                     {origin_country && (
                        <Text
                           css={{
                              d: 'flex',
                              ai: 'center',
                              fontFamily: 'Roboto',
                              color: '#F1F3FE',
                              bc: '#141414cc',
                              border: '1px solid #000000',
                              p: '0 0.6rem',
                              br: '0.5rem',
                              fontSize: '0.9rem',
                           }}
                           title="Origin country"
                        >
                           <FaLocationDot style={{ marginRight: '0.2rem' }} />
                           {origin_country?.map(country => country)}
                        </Text>
                     )}
                  </Row>
               </motion.div>
            </Card.Body>
            <Card.Footer
               css={{
                  position: 'absolute',
                  bottom: 0,
                  zIndex: 1,
                  br: '0',
                  h: '2rem',
                  bc: `${isDark ? '#141414cc' : '#fafafacc'}`,
                  bf: 'blur(6px)',
               }}
            >
               <Link
                  to={
                     name
                        ? `/${ROUTES.SERIES_DETAILS}/${replacedTitle}/${id}`
                        : `/${ROUTES.MOVIE_DETAILS}/${replacedTitle}/${id}`
                  }
                  style={{ width: '100%' }}
               >
                  <Text
                     size={15}
                     css={{
                        ta: 'center',
                        fontWeight: '600',
                        letterSpacing: '0.05px',
                        w: '100%',
                        truncateText: '100%',
                        '&:hover': {
                           tdl: 'underline',
                        },
                     }}
                     title={title ? title : name}
                  >
                     {title ? title : name}
                  </Text>
               </Link>
            </Card.Footer>
         </Card>
      </motion.article>
   );
};

export default CardLg;

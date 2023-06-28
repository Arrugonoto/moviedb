import { ReactElement } from 'react';
import { Card, Text, Col, Row, Tooltip, useTheme } from '@nextui-org/react';
import { FaImage, FaStar, FaUser } from 'react-icons/fa';
import style from './movieCard.module.css';
import { motion } from 'framer-motion';

interface PropTypes {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   original_language: string;
   original_title: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date?: string;
   first_air_date?: string;
   title: string;
   name: string;
   origin_country: string[];
   video: boolean;
   vote_average: number;
   vote_count: number;
}

const CardLgAnimated = ({
   id,
   overview,
   popularity,
   poster_path,
   release_date,
   first_air_date,
   name,
   title,
   vote_average,
   vote_count,
}: PropTypes): ReactElement => {
   const { isDark } = useTheme();

   return (
      <motion.article
         style={{
            width: '12rem',
            height: '20rem',
            borderRadius: '0.3rem',
            overflow: 'hidden',
         }}
         whileHover={{
            width: '22rem',
         }}
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
            <Card.Header
               css={{
                  position: 'absolute',
                  h: '1.6rem',
                  bf: 'blur(5px)',
                  bc: `${
                     isDark ? 'rgba(8, 8, 8, .8)' : 'rgba(250, 250, 250, .8)'
                  }`,
               }}
               className={style.cardHeader}
            >
               <Row align="center" justify="center" css={{ gap: '.4rem;' }}>
                  <Tooltip content={'Rating'} shadow={true}>
                     <FaStar style={{ fontSize: '1.2rem', color: '#9210A0' }} />
                  </Tooltip>
                  <Text>{5.5}</Text>
               </Row>
               <Row align="center" justify="center" css={{ gap: '.4rem;' }}>
                  <Tooltip content={'Vote count'} shadow={true}>
                     <FaUser style={{ fontSize: '1.2rem', color: '#9210A0' }} />
                  </Tooltip>
                  <Text>{16000}</Text>
               </Row>
            </Card.Header>
            <Card.Body css={{ p: '0', ov: 'hidden' }}>
               {poster_path ? (
                  <Card.Image
                     src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                     width="100%"
                     objectFit="cover"
                     alt="Movie poster"
                     loading="lazy"
                     className={style.cardImage}
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

               <Card.Footer
                  isBlurred
                  css={{
                     position: 'absolute',
                     bottom: 0,
                     zIndex: 1,
                     br: '0',
                     h: '2rem',
                  }}
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
                     title={'title'}
                  >
                     movie title
                  </Text>
               </Card.Footer>
            </Card.Body>
         </Card>
      </motion.article>
   );
};

export default CardLgAnimated;

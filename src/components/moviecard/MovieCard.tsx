import { ReactElement, forwardRef } from 'react';
import { Card, Text, Col, Row, Tooltip, useTheme } from '@nextui-org/react';
import { FaImage, FaStar, FaUser } from 'react-icons/fa';
import style from './movieCard.module.css';

interface PropTypes {
   backdrop_path: string;
   id: number;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   title: string;
   vote_average: number;
   vote_count: number;
}

const MovieCard = forwardRef(
   (
      {
         backdrop_path,
         id,
         original_title,
         overview,
         popularity,
         poster_path,
         release_date,
         title,
         vote_average,
         vote_count,
      }: PropTypes,
      ref
   ): ReactElement => {
      const { isDark } = useTheme();

      return (
         <div ref={ref}>
            <Card
               isPressable
               allowTextSelectionOnPress
               css={{ w: '12rem', h: '24rem' }}
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
                        <FaStar
                           style={{ fontSize: '1.2rem', color: '#9210A0' }}
                        />
                     </Tooltip>
                     <Text>{vote_average}</Text>
                  </Row>
                  <Row align="center" justify="center" css={{ gap: '.4rem;' }}>
                     <Tooltip content={'Vote count'} shadow={true}>
                        <FaUser
                           style={{ fontSize: '1.2rem', color: '#9210A0' }}
                        />
                     </Tooltip>
                     <Text>{vote_count}</Text>
                  </Row>
               </Card.Header>
               <Card.Body css={{ p: '0' }}>
                  {poster_path ? (
                     <Col css={{ h: '18rem', ov: 'hidden' }}>
                        <Card.Image
                           src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                           width="100%"
                           height="100%"
                           objectFit="cover"
                           alt="Movie poster"
                           loading="lazy"
                           css={{ br: '0 0 .6rem .6rem' }}
                           className={style.cardImage}
                        />
                     </Col>
                  ) : (
                     <Col
                        css={{
                           d: 'flex',
                           fd: ' column',
                           h: '18rem',
                           w: '100%',
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

                  <Col css={{ p: '.5rem .6rem 0 .6rem' }}>
                     <Text
                        size={15}
                        css={{
                           ta: 'center',
                           fontWeight: '600',
                           letterSpacing: '0.05px',
                        }}
                     >
                        {title}
                     </Text>
                  </Col>
               </Card.Body>
            </Card>
         </div>
      );
   }
);

export default MovieCard;

import { ReactElement } from 'react';
import { Card, Text, Col, Row, Tooltip, useTheme } from '@nextui-org/react';
import { FaImage, FaStar, FaUser } from 'react-icons/fa';
import style from './movieCard.module.css';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';

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

const CardMd = ({
   id,
   poster_path,
   title,
   vote_average,
   vote_count,
}: PropTypes): ReactElement => {
   const { isDark } = useTheme();
   const titleRegex = /:|,|\./g;
   const movieTitle: string = title
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(titleRegex, '');

   return (
      <article>
         <Link to={`/${ROUTES.MOVIE_DETAILS}/${movieTitle}/${id}`}>
            <Card
               isPressable
               allowTextSelectionOnPress={true}
               css={{
                  w: '12.3rem',
                  h: '22.2rem',
                  borderRadius: '0.5rem',
                  ov: 'hidden',
               }}
               className={style.card}
               title={title}
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
                     <Tooltip
                        content={'Rating'}
                        shadow={true}
                        color="default"
                        contentColor="default"
                        css={{}}
                     >
                        <FaStar
                           style={{ fontSize: '1.2rem', color: '#9210A0' }}
                        />
                     </Tooltip>
                     <Text
                        title={vote_average > 0 ? 'Average rating' : 'Unrated'}
                     >
                        {vote_average > 0 ? vote_average : 'UN'}
                     </Text>
                  </Row>
                  <Row align="center" justify="center" css={{ gap: '.4rem;' }}>
                     <Tooltip
                        content={'Vote count'}
                        shadow={true}
                        color="default"
                        contentColor="default"
                        css={{}}
                     >
                        <FaUser
                           style={{ fontSize: '1.2rem', color: '#9210A0' }}
                        />
                     </Tooltip>
                     <Text
                        title={vote_count > 0 ? 'Number of votes' : 'Not rated'}
                     >
                        {vote_count > 0 ? vote_count : 'NR'}
                     </Text>
                  </Row>
               </Card.Header>
               <Card.Body css={{ p: '0' }}>
                  {poster_path ? (
                     <Col css={{ h: '18rem', ov: 'hidden' }}>
                        <Card.Image
                           src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                           width="100%"
                           height="100%"
                           objectFit="cover"
                           alt="Movie poster"
                           loading="lazy"
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

                  <Col
                     css={{
                        p: '.5rem .5rem 0',
                        h: '4rem',
                     }}
                  >
                     <Text
                        className={style.cardTitle}
                        size={15}
                        css={{
                           ta: 'center',
                           fontWeight: '600',
                           letterSpacing: '0.05px',
                        }}
                        title={title}
                     >
                        {title}
                     </Text>
                  </Col>
               </Card.Body>
            </Card>
         </Link>
      </article>
   );
};

export default CardMd;

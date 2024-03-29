import { ReactElement } from 'react';
import { Card, Text, Col, Row, Tooltip, useTheme } from '@nextui-org/react';
import { FaImage, FaStar, FaUser } from 'react-icons/fa';
import style from './movieCard.module.css';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';

interface PropTypes {
   id: number;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date?: string;
   first_air_date?: string;
   title?: string;
   name?: string;
   vote_average: number;
   vote_count: number;
}

const CardMdBlur = ({
   id,
   poster_path,
   name,
   title,
   vote_average,
   vote_count,
}: PropTypes): ReactElement => {
   const { isDark } = useTheme();
   const rating = vote_average.toFixed(1);
   const titleRegex = /:|,|\./g;
   const movieTitle: string = (name ?? title) as string;
   const replacedTitle: string = movieTitle
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(titleRegex, '');

   return (
      <article title={title ? title : name}>
         <Card
            isPressable
            allowTextSelectionOnPress={true}
            css={{
               w: '12rem',
               h: '20rem',
               br: '0.3rem',
               ov: 'hidden',
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
                  <Tooltip
                     content={'Rating'}
                     shadow={true}
                     color="default"
                     contentColor="default"
                     css={{}}
                  >
                     <FaStar style={{ fontSize: '1.2rem', color: '#9210A0' }} />
                  </Tooltip>
                  <Text title={vote_average > 0 ? 'Average rating' : 'Unrated'}>
                     {vote_average > 0 ? rating : 'UN'}
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
                     <FaUser style={{ fontSize: '1.2rem', color: '#9210A0' }} />
                  </Tooltip>
                  <Text
                     title={vote_count > 0 ? 'Number of votes' : 'Not rated'}
                  >
                     {vote_count > 0 ? vote_count : 'NR'}
                  </Text>
               </Row>
            </Card.Header>
            <Card.Body css={{ p: '0', ov: 'hidden' }}>
               {poster_path ? (
                  <Card.Image
                     src={`https://image.tmdb.org/t/p/w500${poster_path}`}
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
                        height: '100%',
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
            </Card.Body>
            <Card.Footer
               isBlurred
               css={{
                  position: 'absolute',
                  bottom: 0,
                  zIndex: 1,
                  br: '0',
                  h: '2rem',
                  bc: `${
                     isDark ? 'rgba(8, 8, 8, .8)' : 'rgba(250, 250, 250, .8)'
                  }`,
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
      </article>
   );
};

export default CardMdBlur;

import { Card, Text, Col } from '@nextui-org/react';
import { ReactElement } from 'react';

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

const MovieCard = ({
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
}: PropTypes): ReactElement => {
   return (
      <article>
         <Card
            isPressable
            allowTextSelectionOnPress
            css={{ w: '12rem', h: '24rem' }}
         >
            <Card.Body css={{ p: '0' }}>
               <Col css={{ h: '18rem' }}>
                  <Card.Image
                     src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                     width="100%"
                     height="100%"
                     objectFit="cover"
                     alt="Movie poster"
                     loading="lazy"
                     css={{ br: '0 0 .6rem .6rem' }}
                  />
               </Col>
               <Col css={{ p: '.5rem .6rem 0 .6rem' }}>
                  <Text size={15} b>
                     {title}
                  </Text>
               </Col>
            </Card.Body>
         </Card>
      </article>
   );
};

export default MovieCard;

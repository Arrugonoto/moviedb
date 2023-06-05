import { Card, Text } from '@nextui-org/react';
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
         <Card isPressable>
            <Card.Body css={{ p: '0' }}>
               <Card.Image
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  alt="Movie poster"
                  loading="lazy"
                  css={{ br: '0 0 1rem 1rem' }}
               />
            </Card.Body>

            <Card.Footer>
               <Text>{title}</Text>
            </Card.Footer>
         </Card>
      </article>
   );
};

export default MovieCard;

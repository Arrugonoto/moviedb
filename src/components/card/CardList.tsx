import { ReactElement } from 'react';
import { Col, Text, Row, Image } from '@nextui-org/react';

interface PropTypes {
   backdrop_path?: string;
   genre_ids: number[];
   id: number;
   original_title?: string;
   original_name?: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   first_air_date?: string;
   title?: string;
   name?: string;
   origin_country: string[];
   video?: boolean;
   vote_average: number;
   vote_count: number;
}

const CardList = ({
   id,
   overview,
   popularity,
   poster_path,
   backdrop_path,
   release_date,
   name,
   title,
   vote_average,
   vote_count,
   genre_ids,
   origin_country,
}: PropTypes): ReactElement => {
   return (
      <article
         style={{
            width: '100%',
            borderRadius: '.5rem',
            overflow: 'hidden',
            padding: '0',
         }}
      >
         <Row css={{ w: '100%' }}>
            <Col css={{ w: 'min-content' }}>
               <Image
                  src={`https://image.tmdb.org/t/p/w300${
                     poster_path ?? backdrop_path
                  }`}
                  objectFit="cover"
                  alt="Movie poster"
                  width="8rem"
                  title={title ? title : name}
               />
            </Col>
            <Col css={{ w: '100%', paddingLeft: '1rem' }}>
               <Row>
                  <Text
                     size={15}
                     css={{
                        ta: 'center',
                        fontWeight: '600',
                        letterSpacing: '0.05px',
                        truncateText: '100%',
                        '&:hover': {
                           tdl: 'underline',
                        },
                     }}
                     title={title ? title : name}
                  >
                     {title ? title : name}
                  </Text>
               </Row>
               <Row align="flex-start">rating</Row>
               <Row align="flex-start">genres</Row>
            </Col>
         </Row>
      </article>
   );
};

export default CardList;

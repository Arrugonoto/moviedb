import { useEffect } from 'react';
import { Container, Row, Col, Image, Text } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface MovieDetailsProps {
   adult: boolean;
   backdrop_path: string;
   belongs_to_collection: unknown;
   budget: number;
   genres: { id: number; name: string }[];
   homepage: string;
   id: number;
   imdb_id: string;
   original_language: string;
   original_title: string;
   overwiew: string;
   popularity: number;
   poster_path: string;
   production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
   }[];
   production_countries: { iso_3166_1: string; name: string }[];
   release_date: string;
   revenue: number;
   runtime: number;
   spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
   }[];
   status: string;
   tagline: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}

const MovieDetailsSection = () => {
   const { movieId } = useParams();
   const { handleFetch, data } = useFetch<MovieDetailsProps>(
      {} as MovieDetailsProps
   );

   const fetchDetails = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/movie/${movieId}`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchDetails();
      // eslint-disable-next-line
   }, []);

   return (
      <Container fluid>
         <Row
            css={{
               position: 'relative',
               h: '22rem',
               background: `url("https://image.tmdb.org/t/p/w1280${data?.backdrop_path}") no-repeat`,
               backgroundSize: 'cover',
               '&:after': {
                  content: '',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  w: '100%',
                  h: '100%',
                  background:
                     'linear-gradient(0deg, rgba(2, 7, 4, 0.8), rgba(146, 16, 160, 0.3))',
                  opacity: 1,
                  backdropFilter: 'blur(1px)',
                  transition:
                     'opacity 0.2s linear, backdrop-filter 0.2s linear',
               },
               '&:hover:after': {
                  opacity: 0.8,
                  backdropFilter: 'blur(0)',
               },
            }}
         >
            <Col
               css={{
                  w: '18rem',
                  position: 'absolute',
                  zIndex: 10,
                  left: '50%',
                  translate: '-50% 30%',
                  bottom: '0',
               }}
            >
               <div style={{ boxShadow: '0 0 1rem 0 #000' }}>
                  <Image
                     src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                     objectFit="cover"
                     alt="Movie Poster"
                     css={{ borderRadius: '.2rem' }}
                  ></Image>
               </div>

               <Text>{data?.title}</Text>
            </Col>
         </Row>
      </Container>
   );
};

export default MovieDetailsSection;

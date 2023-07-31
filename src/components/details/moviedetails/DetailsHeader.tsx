import { useEffect } from 'react';
import { Container, Row, Col, Text, Image, useTheme } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import useFetch from '../../../hooks/useFetch';
import { format } from 'date-fns';
import { BiSolidStar } from 'react-icons/bi';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface MovieDetailsTypes {
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
   overview: string;
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

const DetailsHeader = () => {
   const { movieId } = useParams();
   const { isDark } = useTheme();
   const { handleFetch, data } = useFetch<MovieDetailsTypes>(
      {} as MovieDetailsTypes
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
      <Container
         css={{
            position: 'relative',
            h: '30rem',
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
                  'linear-gradient(0deg, rgba(2, 7, 4, 1), rgba(146, 16, 160, 0.5))',
               opacity: 1,
               backdropFilter: 'blur(0.5px)',
               transition: 'opacity 0.2s linear, backdrop-filter 0.2s linear',
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
               translate: '-50% 24%',
               bottom: '0',
            }}
         >
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 0 .5rem 0',
               }}
            >
               <BiSolidStar style={{ fontSize: '2.3rem', color: '#FFCA28' }} />
               <Col span={3}>
                  <Row
                     css={{
                        d: 'flex',
                        fd: 'column',
                     }}
                  >
                     <Text
                        size={22}
                        css={{
                           fontWeight: '600',
                           fontFamily: 'Roboto',
                           color: '#fafafa',
                        }}
                        title="Rating"
                     >
                        {data?.vote_average?.toFixed(1)}
                     </Text>
                     <Text
                        size={12}
                        css={{
                           fontFamily: 'Roboto',
                           color: 'rgb(202, 202, 202)',
                           letterSpacing: '0.1px',
                           lineHeight: '1px',
                        }}
                        title="Votes"
                     >
                        {data?.vote_count}
                     </Text>
                  </Row>
               </Col>
            </div>
            <div
               style={{
                  boxShadow: '0 0 1rem 0 #000',
                  borderRadius: '0.2rem',
                  overflow: 'hidden',
               }}
            >
               <Image
                  src={`https://image.tmdb.org/t/p/w780${data?.poster_path}`}
                  objectFit="cover"
                  alt="Movie Poster"
               />
            </div>
            <Text
               size={22}
               css={{
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  fontWeight: '600',
                  letterSpacing: '0.3px',
               }}
            >
               {data?.title}
            </Text>
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
               }}
            >
               <Text
                  size={15}
                  css={{
                     color: `${
                        isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                     }`,
                     letterSpacing: '0.05px',
                  }}
               >
                  {data?.release_date &&
                     format(new Date(data?.release_date), 'yyyy')}
               </Text>
               <Text
                  size={15}
                  css={{
                     color: `${
                        isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                     }`,
                     letterSpacing: '0.05px',
                  }}
               >
                  {`${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}m`}
               </Text>
            </div>
         </Col>
      </Container>
   );
};

export default DetailsHeader;

import { useEffect } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Text, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface CreditsTypes {
   cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
   }[];
   crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
   }[];
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
   credits: CreditsTypes;
}

const MovieCredits = () => {
   const { movieId } = useParams();
   const { handleFetch, data } = useFetch<MovieDetailsTypes>(
      {} as MovieDetailsTypes
   );

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      window.scrollTo({
         top: 0,
      });
      // eslint-disable-next-line
   }, []);

   return (
      <section style={{ minHeight: '100dvh' }}>
         <Container fluid>
            <Row css={{ height: '10rem', gap: '0.5rem' }}>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     height: '100%',
                     overflow: 'hidden',
                  }}
               >
                  <Image
                     src={`${BASE_URL}${IMAGE_SIZE.POSTER.W342}${data?.poster_path}`}
                     objectFit="cover"
                     width="6rem"
                     alt="Movie poster"
                     css={{ borderRadius: '0.1rem' }}
                  />
               </div>
               <div
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                     height: '100%',
                     justifyContent: 'center',
                  }}
               >
                  <Row css={{ d: 'flex', gap: '.4rem' }}>
                     <Text
                        h1
                        size={30}
                        css={{ fontFamily: 'Roboto', letterSpacing: '0.1px' }}
                     >
                        {data?.title}
                     </Text>
                     <Text size={18} color="rgb(150, 150, 150)">
                        ({data?.release_date?.slice(0, 4)})
                     </Text>
                  </Row>
                  <Row>
                     <Text h2 size={22} css={{ opacity: '0.8' }}>
                        Cast & Crew
                     </Text>
                  </Row>
               </div>
            </Row>
            <Row css={{ p: '1rem 0', fd: 'column' }}>
               <Text h3 size={20}>
                  Cast
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {data?.credits?.cast?.map(person => (
                     <article
                        key={person?.cast_id}
                        style={{
                           display: 'flex',
                           width: '100%',
                           height: '8rem',
                           borderRadius: '0.4rem',
                           overflow: 'hidden',
                           gap: '1rem',
                        }}
                     >
                        <div>
                           {person?.profile_path ? (
                              <Image
                                 src={`${
                                    BASE_URL +
                                    IMAGE_SIZE.PROFILE.W185 +
                                    person?.profile_path
                                 }`}
                                 width="6rem"
                                 objectFit="cover"
                              />
                           ) : (
                              <div
                                 style={{
                                    width: '6rem',
                                    height: '100%',
                                    background: 'rgb(105, 223, 27)',
                                 }}
                              ></div>
                           )}
                        </div>
                        <Col css={{ d: 'flex', fd: 'column', jc: 'center' }}>
                           <Row>
                              <Text size={18} css={{ fontWeight: '600' }}>
                                 {person?.name}
                              </Text>
                           </Row>
                           <Row>
                              <Text color="#9210a0">{person?.character}</Text>
                           </Row>
                        </Col>
                     </article>
                  ))}
               </Row>
            </Row>
            <Row css={{ p: '1rem 0' }}>
               <Text h3 size={20}>
                  Crew
               </Text>
               <Row></Row>
            </Row>
         </Container>
      </section>
   );
};

export default MovieCredits;

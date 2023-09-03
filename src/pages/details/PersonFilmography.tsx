import { useEffect } from 'react';
import { Container, Row, Text, Image } from '@nextui-org/react';
import { useParams, Link } from 'react-router-dom';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import Crew from '../../components/details/persondetails/Crew';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import ROUTES from '../../routes/routes';
import CardFilmography from '../../components/card/CardFilmography';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface PersonDetailsTypes {
   adult: false;
   also_known_as: string[];
   biography: string;
   birthday: string;
   deathday: string;
   gender: number;
   homepage: string;
   id: number;
   imdb_id: string;
   known_for_department: string;
   name: string;
   place_of_birth: string;
   popularity: number;
   profile_path: string;
   combined_credits: {
      cast: {
         adult: boolean;
         backdrop_path: string;
         genre_ids: number[];
         id: number;
         original_language: string;
         original_title: string;
         overview: string;
         popularity: number;
         poster_path: string;
         release_date: string;
         title: string;
         video: boolean;
         vote_average: number;
         vote_count: number;
         character: string;
         credit_id: string;
         order: number;
         media_type: string;
         origin_country: string[];
         original_name: string;
         first_air_date: string;
         name: string;
         episode_count: number;
      }[];
      crew: {
         adult: boolean;
         backdrop_path: string;
         genre_ids: number[];
         id: number;
         original_language: string;
         original_title: string;
         overview: string;
         popularity: number;
         poster_path: string;
         release_date: string;
         title: string;
         video: boolean;
         vote_average: number;
         vote_count: number;
         credit_id: string;
         department: string;
         job: string;
         media_type: string;
         origin_country: string[];
         original_name: string;
         first_air_date: string;
         name: string;
         episode_count: number;
      }[];
   };
}

const PersonFilmography = () => {
   const { personName, personId } = useParams();
   const { handleFetch, data } = useFetch<PersonDetailsTypes>(
      {} as PersonDetailsTypes
   );

   const sortedProductions = data?.combined_credits?.cast?.sort(
      (curr, next) => {
         const currDate = curr?.release_date || curr?.first_air_date;
         const nextDate = next?.release_date || next?.first_air_date;

         if (!currDate && !nextDate) return 0;
         if (!currDate) return -1;
         if (!nextDate) return 1;

         return new Date(nextDate).getTime() - new Date(currDate).getTime();
      }
   );

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/person/${personId}?append_to_response=combined_credits&language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [personId]);

   return (
      <Container css={{ minHeight: '100dvh', m: '0', p: '0' }}>
         <Row css={{ gap: '1rem' }}>
            <div style={{ minWidth: '5rem', width: '9rem' }}>
               <Image
                  src={`${BASE_URL}${IMAGE_SIZE.PROFILE.W632}/${data?.profile_path}`}
                  width="100%"
                  loading="lazy"
                  objectFit="cover"
                  alt="Movie Poster"
                  css={{ borderRadius: '0.2rem' }}
               ></Image>
            </div>
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
               }}
            >
               <Row>
                  <Link
                     to={`/${ROUTES.PERSON_DETAILS}/${personName}/${personId}`}
                  >
                     <Text
                        h1
                        css={{
                           fontFamily: 'Roboto',
                           fontSize: '2.2rem',
                           letterSpacing: '0.05px',
                           '&:hover': {
                              color: '#9210A0',
                              textDecoration: 'underline',
                           },
                        }}
                     >
                        {data?.name}
                     </Text>
                  </Link>
               </Row>
               <Row>
                  <Text
                     h2
                     css={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        opacity: '0.9',
                     }}
                  >
                     Filmography
                  </Text>
               </Row>
            </div>
         </Row>
         <Row
            css={{
               d: 'flex',
               fd: 'column',
               p: '0',
               gap: '1rem',
            }}
         >
            {data?.combined_credits?.cast?.length > 0 && (
               <Row
                  css={{
                     width: '80%',
                     fd: 'column',
                     m: '2rem 0 1rem 0',
                     p: '0 1.5rem',
                  }}
               >
                  <Row css={{ marginBottom: '0.5rem' }}>
                     <Text
                        h3
                        css={{
                           fontSize: '1.3rem',
                           borderBottom: '3px solid #9210A0',
                        }}
                     >
                        Actor
                     </Text>
                  </Row>
                  <Row css={{ d: 'flex', fd: 'column', gap: '1rem' }}>
                     {sortedProductions?.map(production => (
                        // key={production?.credit_id}
                        <CardFilmography
                           key={production?.credit_id}
                           production={production}
                           lastElement={
                              sortedProductions?.indexOf(production) === 19 ||
                              sortedProductions?.indexOf(production) ===
                                 sortedProductions?.length - 1
                           }
                        />
                     ))}
                  </Row>
               </Row>
            )}
            <Row>
               <Crew crew={data?.combined_credits?.crew} />
            </Row>
         </Row>
      </Container>
   );
};

export default PersonFilmography;

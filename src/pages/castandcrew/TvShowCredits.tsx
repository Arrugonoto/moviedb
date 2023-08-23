import { useEffect } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Text, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import SeriesFullCast from '../../components/details/tvshowdetails/SeriesFullCast';
import SeriesFullCrew from '../../components/details/tvshowdetails/SeriesFullCrew';
import ROUTES from '../../routes/routes';

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
      roles: {
         credit_id: string;
         character: string;
         episode_count: number;
      }[];
      total_episode_count: number;
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
      jobs: {
         credit_id: string;
         job: string;
         episode_count: number;
      }[];
      department: string;
      total_episode_count: number;
   }[];
}

interface SeriesDetailsTypes {
   adult: boolean;
   backdrop_path: string;
   first_air_date: string;
   genres: {
      id: number;
      name: string;
   }[];
   id: number;
   in_production: boolean;
   name: string;
   number_of_episodes: number;
   number_of_seasons: number;
   origin_country: string[];
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
   }[];
   aggregate_credits: CreditsTypes;
}

const TvShowCredits = () => {
   const { tvShowId, tvShowTitle } = useParams();
   const { handleFetch, data } = useFetch<SeriesDetailsTypes>(
      {} as SeriesDetailsTypes
   );

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/tv/${tvShowId}?append_to_response=aggregate_credits&language=en-US`;

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
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     height: '100%',
                     overflow: 'hidden',
                     width: '6rem',
                  }}
               >
                  <Image
                     src={`${BASE_URL}${IMAGE_SIZE.POSTER.W342}${data?.poster_path}`}
                     loading="lazy"
                     objectFit="cover"
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
                     <Link
                        to={`/${ROUTES.SERIES_DETAILS}/${tvShowTitle}/${tvShowId}`}
                     >
                        <Text
                           h1
                           size={30}
                           css={{
                              fontFamily: 'Roboto',
                              letterSpacing: '0.1px',
                              cursor: 'pointer',
                              '&:hover': {
                                 textDecoration: 'underline',
                                 color: '#9210A0',
                              },
                           }}
                        >
                           {data?.name}
                        </Text>
                     </Link>
                     <Text size={18} color="rgb(150, 150, 150)">
                        ({data?.first_air_date?.slice(0, 4)})
                     </Text>
                  </Row>
                  <Row>
                     <Text h2 size={22} css={{ opacity: '0.8' }}>
                        Cast & Crew
                     </Text>
                  </Row>
               </div>
            </Row>
            <SeriesFullCast cast={data?.aggregate_credits?.cast} />
            <SeriesFullCrew crew={data?.aggregate_credits?.crew} />
         </Container>
      </section>
   );
};

export default TvShowCredits;

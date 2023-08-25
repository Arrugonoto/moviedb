import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Text, Image, Col } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import ROUTES from '../../routes/routes';
import { BiSolidStar } from 'react-icons/bi';
import TvShowEpisode from '../../components/tvshow/TvShowEpisode';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface TvShowDetailsTypes {
   name: string;
}

interface TvShowSeasonTypes {
   _id: string;
   air_date: string;
   name: string;
   overview: string;
   id: number;
   poster_path: string;
   season_number: number;
   vote_average: number;
   episodes: {
      air_date: string;
      episode_number: number;
      episode_type: string;
      id: number;
      name: string;
      overview: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string;
      vote_average: number;
      vote_count: number;
   }[];
}

const TvShowSeason = () => {
   const { tvShowId, tvShowSeason, tvShowTitle } = useParams();
   const { handleFetch, data } = useFetch<TvShowSeasonTypes>(
      {} as TvShowSeasonTypes
   );
   const { handleFetch: handleFetchDetails, data: detailsData } =
      useFetch<TvShowDetailsTypes>({} as TvShowDetailsTypes);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/tv/${tvShowId}/season/${tvShowSeason}?language=en-US`;

      handleFetch({ url, options });
   };

   const fetchDetails = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`;

      handleFetchDetails({ url, options });
   };

   useEffect(() => {
      fetchData();
      fetchDetails();
      // eslint-disable-next-line
   }, [tvShowSeason]);

   return (
      <section>
         <Container css={{ minHeight: '100dvh', fd: 'column' }}>
            <Row css={{ gap: '1rem', height: '9rem' }}>
               <Col span={1} css={{ minWidth: '6rem' }}>
                  <Image
                     src={`${BASE_URL}${IMAGE_SIZE.POSTER.W342}/${data?.poster_path}`}
                     alt="Tv Show Poster"
                     objectFit="cover"
                     width="100%"
                     loading="lazy"
                  />
               </Col>
               <Col
                  css={{
                     d: 'flex',
                     fd: 'column',
                     jc: 'space-between',
                     minHeight: '100%',
                     gap: '1rem',
                  }}
               >
                  <Row css={{ fd: 'column' }}>
                     <Row>
                        <Link
                           to={`/${ROUTES.SERIES_DETAILS}/${tvShowTitle}/${tvShowId}`}
                        >
                           <Text
                              h1
                              size={22}
                              css={{
                                 fontFamily: 'Roboto',
                                 fontWeight: '500',
                                 m: '0',
                                 letterSpacing: '0.05px',
                                 '&:hover': {
                                    textDecoration: 'underline',
                                    color: '#9210A0',
                                 },
                              }}
                           >
                              {detailsData?.name}
                           </Text>
                        </Link>
                     </Row>
                     <Row>
                        <Text
                           h2
                           size={18}
                           css={{
                              fontFamily: 'Roboto',
                              fontWeight: '500',
                              m: '0',
                              letterSpacing: '0.05px',
                           }}
                        >
                           {data?.name}
                        </Text>
                     </Row>
                  </Row>
                  <Row css={{ gap: '0.3rem', ai: 'center' }}>
                     <BiSolidStar
                        style={{ fontSize: '1.7rem', color: '#9210A0' }}
                     />
                     <Text css={{ fontSize: '1.7rem', fontWeight: '600' }}>
                        {data?.vote_average}
                     </Text>
                  </Row>
               </Col>
            </Row>
            <Row
               css={{
                  p: '2rem 0 1rem 0',
                  jc: 'center',
                  borderBottom: '1px solid rgb(150, 150, 150)',
               }}
            >
               <Text css={{ width: '80%' }}>{data?.overview}</Text>
            </Row>
            <Row css={{ fd: 'column', gap: '2rem', p: '1rem 0' }}>
               {data?.episodes?.map(episode => (
                  <TvShowEpisode key={episode?.id} episode={episode} />
               ))}
            </Row>
         </Container>
      </section>
   );
};

export default TvShowSeason;

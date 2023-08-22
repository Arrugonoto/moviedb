import { useEffect } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Text, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import Review from '../../components/details/reviews/Review';
import ROUTES from '../../routes/routes';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface ReviewsTypes {
   results: {
      author: string;
      author_details: {
         name: string;
         username: string;
         avatar_path: string;
         rating: number;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
   }[];
}

interface ImagesTypes {
   backdrops: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
   }[];
   logos: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
   }[];
   posters: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
   }[];
}

interface TvShowDetailsTypes {
   adult: boolean;
   backdrop_path: string;
   created_by: {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string;
   }[];
   episode_run_time: number[];
   first_air_date: string;
   genres: {
      id: number;
      name: string;
   }[];
   homepage: string;
   id: number;
   in_production: boolean;
   languages: string[];
   last_air_date: string;
   last_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      vote_average: number;
      vote_count: number;
      air_date: string;
      episode_number: number;
      episode_type: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string;
   };
   name: string;
   next_episode_to_air: unknown;
   networks: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
   }[];
   number_of_episodes: number;
   number_of_seasons: number;
   origin_country: string[];
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
   }[];
   production_countries: {
      iso_3166_1: string;
      name: string;
   }[];
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
   spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
   }[];
   status: string;
   tagline: string;
   type: string;
   vote_average: number;
   vote_count: number;
   images: ImagesTypes;
   reviews: ReviewsTypes;
}

//

const TvShowReviews = () => {
   const { tvShowId, tvShowTitle } = useParams();
   const { handleFetch, data } = useFetch<TvShowDetailsTypes>(
      {} as TvShowDetailsTypes
   );

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/tv/${tvShowId}?append_to_response=images,reviews&?language=en-US`;

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
                        Reviews
                     </Text>
                  </Row>
               </div>
            </Row>
            <Row css={{ fd: 'column', gap: '1.4rem', mt: '1rem' }}>
               {data?.reviews?.results?.map(review => (
                  <Review
                     key={review.id}
                     author={review?.author}
                     avatar_path={review?.author_details?.avatar_path}
                     rating={review?.author_details?.rating}
                     content={review?.content}
                     created_at={review?.updated_at}
                     id={review?.id}
                     updated_at={review?.updated_at}
                  />
               ))}
            </Row>
         </Container>
      </section>
   );
};

export default TvShowReviews;

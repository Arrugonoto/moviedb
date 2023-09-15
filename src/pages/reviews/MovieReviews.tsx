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
   reviews: ReviewsTypes;
}

interface ReviewsTypes {
   id: number;
   page: number;
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
   total_pages: number;
   total_results: number;
}

const MovieReviews = () => {
   const { movieId, movieTitle } = useParams();
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

      const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=reviews`;

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
                        to={`/${ROUTES.MOVIE_DETAILS}/${movieTitle}/${movieId}`}
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
                           {data?.title}
                        </Text>
                     </Link>
                     <Text size={18} color="rgb(150, 150, 150)">
                        ({data?.release_date?.slice(0, 4)})
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

export default MovieReviews;

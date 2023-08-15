import { useEffect } from 'react';
import { Container, Text } from '@nextui-org/react';
import useFetch from '../../../hooks/useFetch';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import { useParams } from 'react-router-dom';
import Review from '../reviews/Review';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface ReviewsTypes {
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
}

const MovieReview = () => {
   const { movieId } = useParams();
   const { handleFetch, data } = useFetch<ReviewsTypes[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [movieId]);

   return (
      <Container
         css={{
            jc: 'start',
            p: '0',
         }}
      >
         {data.length > 0 ? (
            <Review
               author={data[0]?.author}
               avatar_path={data[0]?.author_details?.avatar_path}
               rating={data[0]?.author_details?.rating}
               content={data[0]?.content}
               created_at={data[0]?.created_at}
               id={data[0]?.id}
               updated_at={data[0]?.updated_at}
            />
         ) : (
            <div
               style={{
                  background:
                     'linear-gradient(175deg, #9210a04c, transparent 60%)',
                  width: '80%',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 0 0.8rem 0 rgba(0, 0, 0, 0.2)',
               }}
            >
               <Text>
                  Currently watched Title doesn't contain any reviews yet.
               </Text>
            </div>
         )}
      </Container>
   );
};

export default MovieReview;

import { useEffect } from 'react';
import { Container, Row, Text, Avatar } from '@nextui-org/react';
import useFetch from '../../../hooks/useFetch';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import { useParams } from 'react-router-dom';

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

const Review = () => {
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
      <Container css={{ bc: 'rgba(146, 16, 160, 0.2)' }}>
         <article>
            <Row>
               <Text></Text>
            </Row>
            <Row>
               <Text>{data?.map(el => el.author)}</Text>
            </Row>
            <Row></Row>
         </article>
      </Container>
   );
};

export default Review;

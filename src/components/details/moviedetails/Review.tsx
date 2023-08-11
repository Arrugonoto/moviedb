import { useEffect } from 'react';
import { Container, Row, Text, Avatar } from '@nextui-org/react';
import useFetch from '../../../hooks/useFetch';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import { useParams } from 'react-router-dom';
import { BASE_URL, IMAGE_SIZE } from '../../../data/imageConfig';
import { BsPersonCircle } from 'react-icons/bs';
import format from 'date-fns/format';

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
   const reviewIndex: number = Math.floor(Math.random() * data.length);
   const reviewDate: string = format(
      new Date(data[reviewIndex]?.updated_at),
      'dd MMM y'
   );

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
   }, []);

   return (
      <Container
         css={{
            jc: 'start',
            p: '0',
         }}
      >
         <article
            style={{
               background: 'linear-gradient(#9210a04c, transparent)',
               width: '80%',
               padding: '1rem 2rem',
               borderRadius: '0.5rem',
               boxShadow: '0 0 0.8rem 0 rgba(0, 0, 0, 0.2)',
            }}
         >
            <Row css={{ ai: 'center', gap: '0.7rem', padding: '0.5rem 0' }}>
               {data[reviewIndex]?.author_details?.avatar_path ? (
                  <Avatar
                     size="lg"
                     src={`${BASE_URL}${IMAGE_SIZE.PROFILE.W185}${data[reviewIndex]?.author_details?.avatar_path}`}
                     alt="User profile"
                     zoomed
                  />
               ) : (
                  <div style={{ padding: '0.1rem' }}>
                     <BsPersonCircle
                        style={{ fontSize: '2.8rem', color: '#9210A0' }}
                     />
                  </div>
               )}
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text h4 size={18} css={{ m: '0' }}>
                     {data[reviewIndex]?.author}
                  </Text>
                  <Text size={14} css={{ m: '0' }}>
                     Written on {reviewDate}
                  </Text>
               </div>
               <div>{data[reviewIndex]?.author_details?.rating}</div>
            </Row>
            <Row css={{ padding: '1rem 0' }}>
               <Text>{data[reviewIndex]?.content}</Text>
            </Row>
            <Row></Row>
         </article>
      </Container>
   );
};

export default Review;

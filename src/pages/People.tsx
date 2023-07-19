import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { Container, Row, Text, Pagination } from '@nextui-org/react';
import { API_KEY } from '../services/api-key';
import { METHODS } from '../services/api';
import CardMdBlurPeople from '../components/card/CardMdBlurPeople';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface PeopleProps {
   adult: boolean;
   id: number;
   name: string;
   original_name: string;
   media_type: string;
   popularity: number;
   gender: 1;
   known_for_department: string;
   profile_path: string;
   known_for: object[];
}

const People = () => {
   const [page, setPage] = useState<number>(1);
   const { handleFetch, data } = useFetch<PeopleProps[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/trending/person/day?page=${page}`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
      // eslint-disable-next-line
   }, [page]);

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, []);

   return (
      <section style={{ minHeight: '100dvh' }}>
         <Container>
            <Row>
               <Text
                  h1
                  size={26}
                  css={{
                     textGradient: '45deg, $accent400 10%, $violet400 100%',
                     letterSpacing: '0.5px',
                  }}
               >
                  Popular in industry
               </Text>
            </Row>
            <Row css={{ jc: 'center', p: '2rem 0' }}>
               <div
                  style={{
                     display: 'grid',
                     width: '90%',
                     placeItems: 'center',
                     gridTemplateColumns:
                        'repeat(auto-fit, minmax(12rem, 1fr))',
                     gap: '2rem',
                  }}
               >
                  {data?.map(person => (
                     <CardMdBlurPeople
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        popularity={person.popularity}
                        original_name={person.original_name}
                        profile_path={person.profile_path}
                     />
                  ))}
               </div>
            </Row>
            <Row css={{ jc: 'center' }}>
               <Pagination
                  total={500}
                  initialPage={1}
                  onChange={(page: number) => setPage(page)}
               />
            </Row>
         </Container>
      </section>
   );
};

export default People;

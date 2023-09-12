import { useEffect, useState } from 'react';
import { Container, Row, Pagination } from '@nextui-org/react';
import CardSearchResult from '../../card/CardSearchResult';
import { useSearchParams } from 'react-router-dom';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import useFetch from '../../../hooks/useFetch';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface SearchTypes {
   adult: boolean;
   gender: number;
   id: number;
   known_for_department: string;
   name: string;
   original_name: string;
   popularity: number;
   profile_path: string;
   known_for: {
      adult: boolean;
      backdrop_path: string;
      id: number;
      title: string;
      original_language: string;
      original_title: string;
      name: string;
      original_name: string;
      overview: string;
      poster_path: string;
      media_type: string;
      genre_ids: number[];
      popularity: number;
      release_date: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
   }[];
}

const ResultsPeople = () => {
   const [searchParams] = useSearchParams();
   const queryString = searchParams.get('q');
   const [page, setPage] = useState<number>(1);
   const { handleFetch, data, lastPage } = useFetch<SearchTypes[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/search/person?query=${queryString}&include_adult=false&language=en-US&page=${page}`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [queryString, page]);

   return (
      <Container
         fluid
         css={{
            d: 'flex',
            fd: 'column',
            flexGrow: 1,
            height: '100%',
            jc: 'space-between',
            gap: '2rem',
         }}
      >
         <Row css={{ fd: 'column', gap: '1rem' }}>
            {data?.map(result => (
               <CardSearchResult key={result?.id} result={result} />
            ))}
         </Row>
         <Row css={{ jc: 'center' }}>
            <Pagination
               initialPage={1}
               page={page}
               total={lastPage}
               onChange={(page: number) => setPage(page)}
            />
         </Row>
      </Container>
   );
};

export default ResultsPeople;

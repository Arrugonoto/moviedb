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
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   origin_country: string[];
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   first_air_date: string;
   name: string;
   vote_average: number;
   vote_count: number;
}

const ResultsTvShows = () => {
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

      const url = `https://api.themoviedb.org/3/search/tv?query=${queryString}&include_adult=false&language=en-US&page=${page}`;

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

export default ResultsTvShows;

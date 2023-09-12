import { useEffect } from 'react';
import { Container, Row, Pagination } from '@nextui-org/react';
import CardSearchResult from '../../card/CardSearchResult';

interface PropTypes {
   results: {
      adult: boolean;
      id: number;
      name?: string;
      original_name?: string;
      media_type: string;
      popularity: number;
      gender?: number;
      known_for_department: string;
      profile_path: string;
      known_for?: {
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
      backdrop_path: string;
      title?: string;
      original_title?: string;
      original_language: string;
      overview: string;
      poster_path: string;
      genre_ids?: number[];
      release_date?: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
      first_air_date?: string;
      origin_country?: string[];
   }[];
   page: number;
   setPage: React.Dispatch<React.SetStateAction<number>>;
   lastPage: number;
}

const ResultsSummary = ({ results, page, setPage, lastPage }: PropTypes) => {
   useEffect(() => {
      setPage(1);
      // eslint-disable-next-line
   }, []);

   return (
      <Container
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
            {results?.map(result => (
               <CardSearchResult key={result?.id} result={result} />
            ))}
         </Row>
         {results?.length > 0 && (
            <Row css={{ jc: 'center' }}>
               <Pagination
                  initialPage={1}
                  page={page}
                  total={lastPage}
                  onChange={(page: number) => setPage(page)}
               />
            </Row>
         )}
      </Container>
   );
};

export default ResultsSummary;

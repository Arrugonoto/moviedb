import { useState, useEffect } from 'react';
import { Container, Row, Button } from '@nextui-org/react';
import ResultsSummary from './results/ResultsSummary';
import ResultsPeople from './results/ResultsPeople';
import ResultsMovies from './results/ResultsMovies';
import ResultsTvShows from './results/ResultsTvShows';
import { useSearchParams } from 'react-router-dom';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface SearchTypes {
   adult: boolean;
   id: number;
   name: string;
   original_name: string;
   media_type: string;
   popularity: number;
   gender: number;
   known_for_department: string;
   profile_path: string;
   known_for: {
      adult: boolean;
      backdrop_path: string;
      id: number;
      title: string;
      original_language: string;
      original_title: string;
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
   title: string;
   original_language: string;
   original_title: string;
   overview: string;
   poster_path: string;
   genre_ids: number[];
   release_date: string;
   video: false;
   vote_average: number;
   vote_count: number;
   first_air_date: string;
   origin_country: string[];
}

const SearchResultsSection = () => {
   const [activeTab, setActiveTab] = useState<string>('Summary');
   const [page, setPage] = useState<number>(1);
   const [searchParams] = useSearchParams();
   const queryString = searchParams.get('q');
   const { handleFetch, data, lastPage } = useFetch<SearchTypes[]>([]);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/search/multi?query=${queryString}&include_adult=false&language=en-US&page=${page}`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      setActiveTab('Summary');
      // eslint-disable-next-line
   }, [queryString]);

   return (
      <Container css={{ d: 'flex', fd: 'column', gap: '2rem' }}>
         <Row justify="center">
            <Button.Group light rounded size="lg">
               <Button onPress={() => setActiveTab('Summary')}>Total</Button>
               <Button onPress={() => setActiveTab('People')}>People</Button>
               <Button onPress={() => setActiveTab('Movies')}>Movies</Button>
               <Button onPress={() => setActiveTab('TvShows')}>
                  TV Series
               </Button>
            </Button.Group>
         </Row>
         <Row css={{ fd: 'column', gap: '1rem' }}>
            <Row>Results: {data?.length}</Row>
            <Row>
               {activeTab === 'Summary' && <ResultsSummary />}
               {activeTab === 'People' && <ResultsPeople />}
               {activeTab === 'Movies' && <ResultsMovies />}
               {activeTab === 'TvShows' && <ResultsTvShows />}
            </Row>
         </Row>
      </Container>
   );
};

export default SearchResultsSection;

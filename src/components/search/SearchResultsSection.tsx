import { useState, useEffect } from 'react';
import { Container, Row, Button, Text } from '@nextui-org/react';
import ResultsSummary from './results/ResultsSummary';
import ResultsPeople from './results/ResultsPeople';
import ResultsMovies from './results/ResultsMovies';
import ResultsTvShows from './results/ResultsTvShows';
import { useSearchParams } from 'react-router-dom';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import useFetchMany from '../../hooks/useFetchMany';

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
   title: string;
   original_language: string;
   original_title: string;
   overview: string;
   poster_path: string;
   genre_ids: number[];
   release_date: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
   first_air_date: string;
   origin_country: string[];
}

interface SearchManyTypes {
   page: number;
   results: SearchTypes[];
   total_pages: number;
   total_results: number;
}

const SearchResultsSection = () => {
   const [activeTab, setActiveTab] = useState<string>('Summary');
   const [page, setPage] = useState<number>(1);
   const [searchParams] = useSearchParams();
   const queryString = searchParams.get('q');
   const { handleFetch, data, lastPage, numberOfResults } = useFetch<
      SearchTypes[]
   >([]);
   const { handleFetchMany, data: dataMany } = useFetchMany<SearchManyTypes>(
      {} as SearchManyTypes
   );

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
      console.log(page);
   };

   const fetchManyData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const urls = [
         `https://api.themoviedb.org/3/search/person?query=${queryString}&include_adult=false&language=en-US&page=1`,
         `https://api.themoviedb.org/3/search/movie?query=${queryString}&include_adult=false&language=en-US&page=1`,
         `https://api.themoviedb.org/3/search/tv?query=${queryString}&include_adult=false&language=en-US&page=1`,
      ];

      handleFetchMany({ urls, options });
   };

   useEffect(() => {
      setPage(1);
      if (page === 1) {
         fetchData();
      }
      fetchManyData();
      setActiveTab('Summary');
      // eslint-disable-next-line
   }, [queryString]);

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [page]);

   return (
      <Container
         css={{
            d: 'flex',
            fd: 'column',
            flexGrow: 1,
            gap: '2rem',
         }}
      >
         <Row justify="center">
            <Button.Group light rounded size="lg">
               <Button onPress={() => setActiveTab('Summary')}>
                  <Text
                     h2
                     css={{
                        color: activeTab === 'Summary' ? '#9210a0' : '',
                        fontSize: '1.2rem',
                     }}
                  >
                     Total
                  </Text>
               </Button>
               <Button
                  disabled={dataMany?.[0]?.total_results > 0 ? false : true}
                  onPress={() => setActiveTab('People')}
               >
                  <Text
                     h2
                     css={{
                        color: activeTab === 'People' ? '#9210a0' : '',
                        fontSize: '1.2rem',
                     }}
                  >
                     People
                  </Text>
                  <span style={{ marginLeft: '0.3rem', opacity: 0.5 }}>
                     ({dataMany?.[0]?.total_results})
                  </span>
               </Button>
               <Button
                  disabled={dataMany?.[1]?.total_results > 0 ? false : true}
                  onPress={() => setActiveTab('Movies')}
               >
                  <Text
                     h2
                     css={{
                        color: activeTab === 'Movies' ? '#9210a0' : '',
                        fontSize: '1.2rem',
                     }}
                  >
                     Movies
                  </Text>
                  <span style={{ marginLeft: '0.3rem', opacity: 0.5 }}>
                     ({dataMany?.[1]?.total_results})
                  </span>
               </Button>
               <Button
                  disabled={dataMany?.[2]?.total_results > 0 ? false : true}
                  onPress={() => setActiveTab('TvShows')}
               >
                  <Text
                     h2
                     css={{
                        color: activeTab === 'TvShows' ? '#9210a0' : '',
                        fontSize: '1.2rem',
                     }}
                  >
                     TV Series
                  </Text>
                  <span style={{ marginLeft: '0.3rem', opacity: 0.5 }}>
                     ({dataMany?.[2]?.total_results})
                  </span>
               </Button>
            </Button.Group>
         </Row>
         <Row
            css={{
               d: 'flex',
               fd: 'column',
               gap: '1rem',
               flexGrow: 1,
            }}
         >
            <Row>
               <Text h3 css={{ fontSize: '1.2rem' }}>
                  Results: {data?.length > 0 ? numberOfResults : 0}
               </Text>
            </Row>
            {data?.length === 0 && (
               <Row>
                  <Text>There are no results that matched your query.</Text>
               </Row>
            )}
            <Row css={{ display: 'flex', fd: 'column', flexGrow: 1 }}>
               {activeTab === 'Summary' && (
                  <ResultsSummary
                     results={data}
                     setPage={setPage}
                     page={page}
                     lastPage={lastPage}
                  />
               )}
               {activeTab === 'People' && <ResultsPeople />}
               {activeTab === 'Movies' && <ResultsMovies />}
               {activeTab === 'TvShows' && <ResultsTvShows />}
            </Row>
         </Row>
      </Container>
   );
};

export default SearchResultsSection;

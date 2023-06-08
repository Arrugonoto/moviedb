import { useState, useEffect } from 'react';
import { Grid, Container, Button } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../../services/api-key';
import { METHODS, API_ENDPOINT } from '../../services/api';
import MovieCard from '../moviecard/MovieCard';
import SelectFilter from './SelectFilter';

type MovieProps = {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
};

const GenreSection = () => {
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const { genreId } = useParams();
   const [page, setPage] = useState<number>(1);
   const [sortType, setSortType] = useState<string>('popularity.desc');

   const fetchMovies = async (): Promise<void> => {
      const options: {
         method: string;
         headers: {
            accept: string;
            Authorization: string;
         };
      } = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const response = await fetch(
         `${API_ENDPOINT.GENRE}&page=${page}&sort_by=${sortType}&with_genres=${genreId}`,
         options
      );
      const result = await response.json();

      if (!response.ok) {
         console.error(result);
         throw new Error(`Couldn't fetch source`);
      }
      console.log(result);
      setMovies(prev => [
         ...new Map([...prev, ...result.results].map(m => [m.id, m])).values(),
      ]);
   };

   useEffect(() => {
      setMovies([]);
      setPage(1);
      fetchMovies();
      // eslint-disable-next-line
   }, [genreId, sortType]);

   useEffect(() => {
      if (page !== 1) {
         fetchMovies();
      }
   }, [page]);

   return (
      <Container direction="column" fluid={true}>
         <Container>
            <SelectFilter setSortType={setSortType} />
         </Container>
         <Grid.Container gap={2} justify="center">
            {movies?.map(movie => (
               <Grid key={movie.id}>
                  <MovieCard
                     id={movie.id}
                     backdrop_path={movie.backdrop_path}
                     original_title={movie.original_title}
                     overview={movie.overview}
                     popularity={movie.popularity}
                     poster_path={movie.poster_path}
                     release_date={movie.release_date}
                     title={movie.title}
                     vote_average={movie.vote_average}
                     vote_count={movie.vote_count}
                  ></MovieCard>
               </Grid>
            ))}
            <Button onClick={() => setPage(prev => prev + 1)}>
               Fetch more
            </Button>
         </Grid.Container>
      </Container>
   );
};

export default GenreSection;

import { useState, useEffect, useRef } from 'react';
import { Grid, Container, Button } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../../services/api-key';
import { METHODS, API_ENDPOINT } from '../../services/api';
import MovieCard from '../moviecard/MovieCard';
import SelectFilter from './SelectFilter';
import useFetchMovies from '../../hooks/useFetchMovies';
import { useIntersection } from '@mantine/hooks';

type OptionsTypes = {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
};

const GenreSection = () => {
   const { genreId } = useParams();
   const [page, setPage] = useState<number>(1);
   const [sortType, setSortType] = useState<string>('popularity.desc');
   const { handleFetch, movies, setMovies, lastPage } = useFetchMovies();
   const lastMovieRef = useRef<HTMLElement>(null);

   const { ref, entry } = useIntersection({
      root: lastMovieRef.current,
      threshold: 1,
   });

   // const lastMovieRef = useCallback(
   //    node => {
   //       if (loading) return;
   //       if (observer.current) observer?.current.disconnect();
   //       observer.current = new IntersectionObserver(entries => {
   //          if (entries[0].isIntersecting && page !== lastPage) {
   //             setPage(prev => prev + 1);
   //          }
   //       });
   //       if (node) observer.current?.observe(node);
   //    },
   //    [loading]
   // );

   const fetchMovies = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `${API_ENDPOINT.GENRE}&page=${page}&sort_by=${sortType}&with_genres=${genreId}`;

      handleFetch({ url, options });
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
      // eslint-disable-next-line
   }, [page]);

   useEffect(() => {
      if (entry?.isIntersecting && page < lastPage) setPage(prev => prev + 1);
      // eslint-disable-next-line
   }, [entry]);

   return (
      <Container direction="column" fluid={true}>
         <Container fluid={true}>
            <SelectFilter setSortType={setSortType} />
         </Container>
         <Grid.Container gap={2} justify="center">
            {movies?.map((movie, i) => {
               if (i === movies.length - 1)
                  return (
                     <Grid key={movie.id} ref={ref}>
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
                  );
               return (
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
               );
            })}
            <Button onPress={() => setPage(prev => prev + 1)}>
               Fetch more
            </Button>
         </Grid.Container>
      </Container>
   );
};

export default GenreSection;

import { useState, useEffect } from 'react';
import { Grid, Card } from '@nextui-org/react';
import { useParams } from 'react-router-dom';

type movieProps = {
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
   const [movies, setMovies] = useState<movieProps[]>([]);
   const { genreId } = useParams();

   const fetchMovies = async () => {
      const options: {
         method: string;
         headers: {
            accept: string;
            Authorization: string;
         };
      } = {
         method: 'GET',
         headers: {
            accept: 'application/json',
            Authorization:
               'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjQzZWZkNTk4YzUwZDA0ZmU2OGJkNzA0YWU4NGMwNyIsInN1YiI6IjYyMTEzYmE0YWE3ODk4MDA0MmZiODg3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIbSHTG7u3unuodoQoKHzouw-e9ju7cIMyWvI1_kFQc',
         },
      };

      const response = await fetch(
         `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
         options
      );
      const result = await response.json();

      if (!response.ok) {
         console.error(result);
         throw new Error(`Couldn't fetch source`);
      }
      console.log(result);
      setMovies(result.results);
   };

   useEffect(() => {
      fetchMovies();
      // eslint-disable-next-line
   }, [genreId]);

   return (
      <Grid.Container>
         container
         <Grid>
            grid wrapper
            {movies.map(movie => (
               <Card key={movie.id}>
                  <Card.Body>{movie.title}</Card.Body>
               </Card>
            ))}
         </Grid>
      </Grid.Container>
   );
};

export default GenreSection;

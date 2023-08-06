import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetailsSection from '../components/details/MovieDetailsSection';

const MovieDetails = () => {
   const { movieId } = useParams();

   useEffect(() => {
      window.scrollTo({
         top: 0,
      });
   }, [movieId]);

   return (
      <section>
         <MovieDetailsSection />
      </section>
   );
};

export default MovieDetails;

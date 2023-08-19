import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SeriesDetailsSection from '../../components/details/SeriesDetailsSection';

const TvShowDetails = () => {
   const { tvShowId } = useParams();

   useEffect(() => {
      window.scrollTo({
         top: 0,
      });
   }, [tvShowId]);

   return (
      <section>
         <SeriesDetailsSection />
      </section>
   );
};

export default TvShowDetails;

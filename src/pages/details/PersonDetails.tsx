import { useEffect } from 'react';
import PersonDetailsSection from '../../components/details/PersonDetailsSection';

const PersonDetails = () => {
   useEffect(() => {
      window.scrollTo({
         top: 0,
      });
   }, []);

   return (
      <section style={{ minHeight: '100dvh' }}>
         <PersonDetailsSection />
      </section>
   );
};

export default PersonDetails;

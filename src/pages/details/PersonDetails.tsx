import { useEffect } from 'react';

const PersonDetails = () => {
   useEffect(() => {
      window.scrollTo({
         top: 0,
      });
   }, []);

   return <section style={{ minHeight: '100dvh' }}>Person Details</section>;
};

export default PersonDetails;

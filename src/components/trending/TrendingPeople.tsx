import { useEffect, useRef } from 'react';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import CardMdBlurPeople from '../moviecard/CardMdBlurPeople';
import { motion } from 'framer-motion';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface PeopleProps {
   adult: boolean;
   id: number;
   name: string;
   original_name: string;
   media_type: string;
   popularity: number;
   gender: 1;
   known_for_department: string;
   profile_path: string;
   known_for: object[];
}

const TrendingPeople = () => {
   const { handleFetch, data } = useFetch<PeopleProps[]>([]);
   const constraintsRef = useRef<HTMLDivElement>(null);

   const fetchSeries = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/trending/person/day?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchSeries();
      console.log(data);
      // eslint-disable-next-line
   }, []);

   return (
      <motion.div
         ref={constraintsRef}
         style={{
            display: 'flex',
            overflowX: 'hidden',
            gap: '1.2rem',
            padding: '.5rem 1rem',
         }}
      >
         <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            style={{ display: 'flex', gap: '1.2rem' }}
            dragElastic={0.1}
         >
            {data?.map(person => (
               <CardMdBlurPeople
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  popularity={person.popularity}
                  original_name={person.original_name}
                  profile_path={person.profile_path}
               />
            ))}
         </motion.div>
      </motion.div>
   );
};

export default TrendingPeople;

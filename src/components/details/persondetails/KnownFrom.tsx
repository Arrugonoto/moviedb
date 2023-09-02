import { useEffect } from 'react';
import { Container, Row, Text } from '@nextui-org/react';
import useFetch from '../../../hooks/useFetch';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import { useParams } from 'react-router-dom';
import CardMdBlur from '../../card/CardMdBlur';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface CreditsTypes {
   cast: {
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
      character: string;
      credit_id: string;
      order: number;
      media_type: string;
      origin_country: string[];
      original_name: string;
      first_air_date: string;
      name: string;
      episode_count: number;
   }[];
   crew: {
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
      credit_id: string;
      department: string;
      job: string;
      media_type: string;
      origin_country: string[];
      original_name: string;
      first_air_date: string;
      name: string;
      episode_count: number;
   }[];
}

interface PropTypes {
   knownDepartment: string;
}

const KnownFrom = ({ knownDepartment }: PropTypes) => {
   const { personId } = useParams();
   const { handleFetch, data } = useFetch<CreditsTypes>({} as CreditsTypes);

   const mostPopularActing = data?.cast?.sort((curr, next) => {
      const currValue = (curr.vote_average + 1) * (curr.vote_count + 1);
      const nextValue = (next.vote_average + 1) * (next.vote_count + 1);

      if (!currValue) return 1;
      if (!nextValue) return -1;

      return nextValue - currValue;
   });

   const mostPopularWorks = data?.crew?.sort((curr, next) => {
      const currValue = (curr.vote_average + 1) * (curr.vote_count + 1);
      const nextValue = (next.vote_average + 1) * (next.vote_count + 1);

      if (!currValue) return 1;
      if (!nextValue) return -1;

      return nextValue - currValue;
   });

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [personId]);

   return (
      <Container css={{ p: '0' }}>
         <Row>
            <Text
               h2
               css={{
                  fontSize: '1.6rem',
                  fontWeight: '600',
                  borderLeft: '5px solid #9210a0',
                  paddingLeft: '0.4rem',
               }}
            >
               Known For
            </Text>
         </Row>
         <Row>
            {knownDepartment === 'Acting' ? (
               <Row
                  css={{
                     gap: '1rem',
                     overflowX: 'scroll',
                     padding: '1.5rem 1rem',
                  }}
               >
                  {mostPopularActing?.map(production => {
                     if (mostPopularActing?.indexOf(production) < 10)
                        return production?.title ? (
                           <CardMdBlur
                              key={production?.credit_id}
                              id={production?.id}
                              overview={production?.overview}
                              popularity={production?.popularity}
                              poster_path={production?.poster_path}
                              title={production?.title}
                              vote_average={production?.vote_average}
                              vote_count={production?.vote_count}
                           />
                        ) : (
                           <CardMdBlur
                              key={production?.credit_id}
                              id={production?.id}
                              overview={production?.overview}
                              popularity={production?.popularity}
                              poster_path={production?.poster_path}
                              name={production?.name}
                              vote_average={production?.vote_average}
                              vote_count={production?.vote_count}
                           />
                        );
                  })}
               </Row>
            ) : (
               <Row
                  css={{
                     gap: '1rem',
                     overflowX: 'scroll',
                     padding: '1.5rem 1rem',
                  }}
               >
                  {mostPopularWorks?.map(production => {
                     if (mostPopularWorks?.indexOf(production) < 10)
                        return production?.title ? (
                           <CardMdBlur
                              key={production?.credit_id}
                              id={production?.id}
                              overview={production?.overview}
                              popularity={production?.popularity}
                              poster_path={production?.poster_path}
                              title={production?.title}
                              vote_average={production?.vote_average}
                              vote_count={production?.vote_count}
                           />
                        ) : (
                           <CardMdBlur
                              key={production?.credit_id}
                              id={production?.id}
                              overview={production?.overview}
                              popularity={production?.popularity}
                              poster_path={production?.poster_path}
                              name={production?.name}
                              vote_average={production?.vote_average}
                              vote_count={production?.vote_count}
                           />
                        );
                  })}
               </Row>
            )}
         </Row>
      </Container>
   );
};

export default KnownFrom;

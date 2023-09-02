import { useEffect } from 'react';
import { Container, Row, Text } from '@nextui-org/react';
import useFetch from '../../../hooks/useFetch';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import { useParams } from 'react-router-dom';
import Cast from './Cast';
import Crew from './Crew';

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

const Filmography = () => {
   const { personId } = useParams();
   const { handleFetch, data } = useFetch<CreditsTypes>({} as CreditsTypes);

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
      <Container
         css={{
            d: 'flex',
            fd: 'column',
            p: '0',
            gap: '1rem',
         }}
      >
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
               Filmography
            </Text>
         </Row>
         {data?.cast?.length > 0 && (
            <Row>
               <Cast cast={data?.cast} />
            </Row>
         )}
         <Row>
            <Crew crew={data?.crew} />
         </Row>
      </Container>
   );
};

export default Filmography;

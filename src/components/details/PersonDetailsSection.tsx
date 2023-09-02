import { useEffect } from 'react';
import { Container, Row } from '@nextui-org/react';
import useFetch from '../../hooks/useFetch';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import DetailsHeader from './persondetails/DetailsHeader';
import { useParams } from 'react-router-dom';
import KnownFrom from './persondetails/KnownFrom';
import Filmography from './persondetails/Filmography';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface PersonDetailsTypes {
   adult: false;
   also_known_as: string[];
   biography: string;
   birthday: string;
   deathday: string;
   gender: number;
   homepage: string;
   id: number;
   imdb_id: string;
   known_for_department: string;
   name: string;
   place_of_birth: string;
   popularity: number;
   profile_path: string;
}

const PersonDetailsSection = () => {
   const { personId } = useParams();
   const { handleFetch, data } = useFetch<PersonDetailsTypes>(
      {} as PersonDetailsTypes
   );

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/person/${personId}?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [personId]);

   return (
      <Container fluid css={{ d: 'flex', p: '0', fd: 'column', gap: '3rem' }}>
         <Row>
            <DetailsHeader person={data} />
         </Row>
         <Row>
            <KnownFrom knownDepartment={data?.known_for_department} />
         </Row>
         <Row>
            <Filmography />
         </Row>
      </Container>
   );
};

export default PersonDetailsSection;

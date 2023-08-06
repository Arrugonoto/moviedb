import { useEffect } from 'react';
import { Container, Row, Col, Text } from '@nextui-org/react';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface MovieDetailsTypes {
   adult: boolean;
   backdrop_path: string;
   belongs_to_collection: unknown;
   budget: number;
   genres: { id: number; name: string }[];
   homepage: string;
   id: number;
   imdb_id: string;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
   }[];
   production_countries: { iso_3166_1: string; name: string }[];
   release_date: string;
   revenue: number;
   runtime: number;
   spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
   }[];
   status: string;
   tagline: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}

const Information = () => {
   const { movieId } = useParams();
   const { handleFetch, data } = useFetch<MovieDetailsTypes>(
      {} as MovieDetailsTypes
   );

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [movieId]);

   return (
      <Container css={{ d: 'flex', fd: 'row' }}>
         <Row css={{ gap: '3rem' }}>
            <Col span={3} css={{ minWidth: '14rem' }}>
               <Row css={{ gap: '1rem' }}>
                  <Col span={6} css={{ minWidth: '6rem' }}>
                     <Text>Budget</Text>
                  </Col>
                  <Col>
                     <Text>${data?.budget}</Text>
                  </Col>
               </Row>
               <Row css={{ gap: '1rem' }}>
                  <Col span={6} css={{ minWidth: '6rem' }}>
                     <Text>Boxoffice</Text>
                  </Col>
                  <Col>
                     <Text>${data?.revenue}</Text>
                  </Col>
               </Row>
               <Row css={{ gap: '1rem' }}>
                  <Col span={6} css={{ minWidth: '6rem' }}>
                     <Text>Original Title</Text>
                  </Col>
                  <Col>
                     <Text>{data?.original_title}</Text>
                  </Col>
               </Row>
               <Row css={{ gap: '1rem' }}>
                  <Col span={6} css={{ minWidth: '6rem' }}>
                     <Text>Title</Text>
                  </Col>
                  <Col>
                     <Text>{data?.title}</Text>
                  </Col>
               </Row>
            </Col>
            <Col span={3} css={{ minWidth: '14rem' }}>
               <Row css={{ gap: '.5rem' }}>
                  <Col span={2} css={{ minWidth: '6rem' }}>
                     <Text>Studio</Text>
                  </Col>
                  <Col>
                     {data?.production_companies?.map(company => (
                        <Text key={company?.id}>{company?.name}</Text>
                     ))}
                  </Col>
               </Row>
               <Row css={{ gap: '.5rem' }}>
                  <Col span={2} css={{ minWidth: '6rem' }}>
                     <Text>Release</Text>
                  </Col>
                  <Col>
                     <Text>
                        {data?.release_date &&
                           format(new Date(data?.release_date), 'dd MMM y')}
                     </Text>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default Information;

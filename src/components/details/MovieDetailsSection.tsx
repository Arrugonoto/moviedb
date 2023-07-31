import { useEffect } from 'react';
import { Container, Row, Col, Image, Text, useTheme } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';
import DetailsHeader from './moviedetails/DetailsHeader';

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
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
   }[];
   crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
   }[];
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
   credits: CreditsTypes;
}

const MovieDetailsSection = () => {
   const { movieId } = useParams();
   const { isDark } = useTheme();
   const { handleFetch, data } = useFetch<MovieDetailsTypes>(
      {} as MovieDetailsTypes
   );
   const { credits } = data;
   const director = credits?.crew?.filter(person => person.job === 'Director');
   const screenplay = credits?.crew?.filter(
      person => person.job === 'Screenplay'
   );

   const fetchDetails = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchDetails();
      // eslint-disable-next-line
   }, []);

   return (
      <Container fluid>
         <DetailsHeader />
         <Row
            css={{
               d: 'flex',
               fd: 'column',
               marginTop: '8rem',
               p: '2rem 0.5rem',
               fontFamily: 'Roboto',
            }}
         >
            <Row css={{ d: 'flex', gap: '.6rem' }}>
               {data?.genres?.map(genre => (
                  <p
                     key={genre.id}
                     style={{
                        color: '#9210a0',
                        border: '1px solid #9210a0',
                        padding: '1px 1rem',
                        borderRadius: '2rem',
                        fontWeight: '600',
                     }}
                  >
                     {genre.name}
                  </p>
               ))}
            </Row>
            <Text css={{ padding: '1rem 0', maxWidth: '80%' }}>
               {data?.overview}
            </Text>
            <Row
               css={{
                  paddingBottom: '1rem',
               }}
            >
               <Col span={12}>
                  <Row>
                     <Text
                        css={{
                           minWidth: '8rem',
                           fontWeight: '600',
                           color: `${
                              isDark
                                 ? 'rgb(170, 170, 170)'
                                 : 'rgb(130, 130, 130)'
                           }`,
                        }}
                     >
                        Director
                     </Text>
                     <div>
                        {director?.map(person => (
                           <Text
                              key={person?.id}
                              css={{
                                 fontFamily: 'Roboto',
                                 cursor: 'pointer',
                                 letterSpacing: '0.01px',
                                 '&:hover': {
                                    textDecoration: 'underline',
                                    color: '#C340C5',
                                 },
                              }}
                           >
                              {person.name}
                           </Text>
                        ))}
                     </div>
                  </Row>
                  <Row>
                     <Text
                        css={{
                           minWidth: '8rem',
                           fontWeight: '600',
                           color: `${
                              isDark
                                 ? 'rgb(170, 170, 170)'
                                 : 'rgb(130, 130, 130)'
                           }`,
                        }}
                     >
                        Screenplay
                     </Text>
                     <div style={{ display: 'flex', gap: '.5rem' }}>
                        {screenplay?.map(person => (
                           <Text
                              key={person?.id}
                              css={{
                                 fontFamily: 'Roboto',
                                 cursor: 'pointer',
                                 letterSpacing: '0.01px',
                                 '&:hover': {
                                    textDecoration: 'underline',
                                    color: '#C340C5',
                                 },
                              }}
                           >
                              {person.name}
                              {screenplay.indexOf(person) !==
                              screenplay.length - 1
                                 ? ','
                                 : ''}
                           </Text>
                        ))}
                     </div>
                  </Row>
                  <Row>
                     <Text
                        css={{
                           minWidth: '8rem',
                           fontWeight: '600',
                           color: `${
                              isDark
                                 ? 'rgb(170, 170, 170)'
                                 : 'rgb(130, 130, 130)'
                           }`,
                        }}
                     >
                        Production
                     </Text>
                     <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {data?.production_countries.map((country, i) => {
                           if (country.iso_3166_1 === 'US') {
                              return (
                                 <Text
                                    key={i}
                                    css={{
                                       fontFamily: 'Roboto',
                                       letterSpacing: '0.01px',
                                    }}
                                 >
                                    USA
                                    {data?.production_countries?.indexOf(
                                       country
                                    ) !==
                                    data?.production_countries.length - 1
                                       ? ','
                                       : ''}
                                 </Text>
                              );
                           } else
                              return (
                                 <Text
                                    key={i}
                                    css={{
                                       fontFamily: 'Roboto',
                                       letterSpacing: '0.01px',
                                    }}
                                 >
                                    {country.name}
                                    {data?.production_countries?.indexOf(
                                       country
                                    ) !==
                                    data?.production_countries.length - 1
                                       ? ','
                                       : ''}
                                 </Text>
                              );
                        })}
                     </div>
                  </Row>
                  <Row>
                     <Text
                        css={{
                           minWidth: '8rem',
                           fontWeight: '600',
                           color: `${
                              isDark
                                 ? 'rgb(170, 170, 170)'
                                 : 'rgb(130, 130, 130)'
                           }`,
                        }}
                     >
                        Release
                     </Text>
                     <Text css={{ fontFamily: 'Roboto' }}>
                        {format(new Date(data?.release_date), 'd MMMM y')}
                     </Text>
                  </Row>
               </Col>
            </Row>
         </Row>
      </Container>
   );
};

export default MovieDetailsSection;

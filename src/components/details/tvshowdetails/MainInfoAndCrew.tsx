import { useEffect } from 'react';
import { Container, Row, Text, Col, useTheme } from '@nextui-org/react';
import { format } from 'date-fns';
import useFetch from '../../../hooks/useFetch';
import { METHODS } from '../../../services/api';
import { API_KEY } from '../../../services/api-key';
import { useNavigate, useParams } from 'react-router-dom';
import ROUTES from '../../../routes/routes';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface PropsTypes {
   genres: { id: number; name: string }[];
   overview: string;
   creators: {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string;
   }[];
   productionCountries: { iso_3166_1: string; name: string }[];
   episodeRuntime: number[];
   firstAirDate: string;
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
      roles: {
         credit_id: string;
         character: string;
         episode_count: number;
      }[];
      total_episode_count: number;
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
      jobs: {
         credit_id: string;
         job: string;
         episode_count: number;
      }[];
      department: string;
      total_episode_count: number;
   }[];
}

const MainInfoAndCrew = ({
   genres,
   overview,
   creators,
   productionCountries,
   episodeRuntime,
   firstAirDate,
}: PropsTypes) => {
   const { isDark } = useTheme();
   const { tvShowId } = useParams();
   const nameRegex = /:|,|\./g;
   const navigate = useNavigate();
   const { handleFetch, data } = useFetch<CreditsTypes>({} as CreditsTypes);
   const credits = data?.crew?.filter(
      person => person?.department === 'Directing'
   );
   const director = credits?.filter(person =>
      person?.jobs?.some(position => position?.job === 'Director')
   );

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/tv/${tvShowId}/aggregate_credits?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, []);

   return (
      <Container
         css={{
            d: 'flex',
            fd: 'column',
            marginTop: '8rem',
            p: '2rem 0.5rem',
            fontFamily: 'Roboto',
         }}
      >
         <Row css={{ d: 'flex', gap: '.6rem' }}>
            {genres?.map(genre => (
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
         <Text
            css={{
               padding: '1rem 0 1rem 0',
               maxWidth: '80%',
            }}
         >
            {overview}
         </Text>
         <Row
            css={{
               p: '1rem 0',
               borderTop: '1px solid #3E055C',
            }}
         >
            <Col span={12}>
               <Row>
                  <Text
                     css={{
                        minWidth: '9rem',
                        fontWeight: '600',
                        color: `${
                           isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                        }`,
                     }}
                  >
                     Created by
                  </Text>
                  <div style={{ display: 'flex', gap: '.5rem' }}>
                     {creators?.map(person => (
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
                           onClick={() =>
                              navigate(
                                 `/${ROUTES.PERSON_DETAILS}/${person?.name
                                    .toLowerCase()
                                    .split(' ')
                                    .join('-')
                                    .replaceAll(nameRegex, '')}/${person?.id}`
                              )
                           }
                        >
                           {person.name}
                           {creators?.indexOf(person) !== creators?.length - 1
                              ? ','
                              : ''}
                        </Text>
                     ))}
                  </div>
               </Row>
               <Row>
                  <Text
                     css={{
                        minWidth: '9rem',
                        fontWeight: '600',
                        color: `${
                           isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                        }`,
                     }}
                  >
                     Director
                  </Text>
                  <div
                     style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                     }}
                  >
                     {director?.map(person => (
                        <Text
                           key={person?.id}
                           css={{
                              whiteSpace: 'nowrap',
                              fontFamily: 'Roboto',
                              cursor: 'pointer',
                              letterSpacing: '0.01px',
                              '&:hover': {
                                 textDecoration: 'underline',
                                 color: '#C340C5',
                              },
                           }}
                           onClick={() =>
                              navigate(
                                 `/${ROUTES.PERSON_DETAILS}/${person?.name
                                    .toLowerCase()
                                    .split(' ')
                                    .join('-')
                                    .replaceAll(nameRegex, '')}/${person?.id}`
                              )
                           }
                        >
                           {person?.name}
                           {director?.indexOf(person) !== creators?.length - 1
                              ? ','
                              : ''}
                        </Text>
                     ))}
                  </div>
               </Row>
               <Row>
                  <Text
                     css={{
                        minWidth: '9rem',
                        fontWeight: '600',
                        color: `${
                           isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                        }`,
                     }}
                  >
                     Production
                  </Text>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                     {productionCountries?.map((country, i) => {
                        if (country?.iso_3166_1 === 'US') {
                           return (
                              <Text
                                 key={i}
                                 css={{
                                    fontFamily: 'Roboto',
                                    letterSpacing: '0.01px',
                                 }}
                              >
                                 USA
                                 {productionCountries?.indexOf(country) !==
                                 productionCountries.length - 1
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
                                 {country?.name}
                                 {productionCountries?.indexOf(country) !==
                                 productionCountries?.length - 1
                                    ? ','
                                    : ''}
                              </Text>
                           );
                     })}
                  </div>
               </Row>
               {episodeRuntime?.length > 0 && (
                  <Row>
                     <Text
                        css={{
                           minWidth: '9rem',
                           fontWeight: '600',
                           color: `${
                              isDark
                                 ? 'rgb(170, 170, 170)'
                                 : 'rgb(130, 130, 130)'
                           }`,
                        }}
                     >
                        Episode runtime
                     </Text>
                     <Text css={{ fontFamily: 'Roboto' }}>
                        {`${episodeRuntime} min`}
                     </Text>
                  </Row>
               )}
               <Row>
                  <Text
                     css={{
                        minWidth: '9rem',
                        fontWeight: '600',
                        color: `${
                           isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                        }`,
                     }}
                  >
                     Release
                  </Text>
                  <Text css={{ fontFamily: 'Roboto' }}>
                     {firstAirDate &&
                        format(new Date(firstAirDate), 'd MMMM y')}
                  </Text>
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default MainInfoAndCrew;

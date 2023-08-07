import { Container, Row, Text, Col, useTheme } from '@nextui-org/react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../routes/routes';

interface MovieDetailsProps {
   genres: { id: number; name: string }[];
   overview: string;
   director: {
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
   screenplay: {
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
   productionCountries: { iso_3166_1: string; name: string }[];
   releaseDate: string;
}

const MainCrew = ({
   genres,
   overview,
   director,
   screenplay,
   productionCountries,
   releaseDate,
}: MovieDetailsProps) => {
   const { isDark } = useTheme();
   const nameRegex = /:|,|\./g;
   const navigate = useNavigate();

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
         <Text css={{ padding: '1rem 0', maxWidth: '80%' }}>{overview}</Text>
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
                           isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
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
                           isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
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
                           {screenplay?.indexOf(person) !==
                           screenplay?.length - 1
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
               <Row>
                  <Text
                     css={{
                        minWidth: '8rem',
                        fontWeight: '600',
                        color: `${
                           isDark ? 'rgb(170, 170, 170)' : 'rgb(130, 130, 130)'
                        }`,
                     }}
                  >
                     Release
                  </Text>
                  <Text css={{ fontFamily: 'Roboto' }}>
                     {releaseDate && format(new Date(releaseDate), 'd MMMM y')}
                  </Text>
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default MainCrew;

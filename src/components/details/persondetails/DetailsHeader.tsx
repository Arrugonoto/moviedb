import { useState } from 'react';
import { Container, Row, Text, Image, Button } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../../data/imageConfig';
import { differenceInYears, format } from 'date-fns';

interface PropTypes {
   person: {
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
   };
}

const DetailsHeader = ({ person }: PropTypes) => {
   const [showMore, setShowMore] = useState<boolean>(false);
   const age: number = differenceInYears(
      new Date(person?.deathday),
      new Date(person?.birthday)
   );
   const ageCurrently: number = differenceInYears(
      new Date(),
      new Date(person?.birthday)
   );

   return (
      <Container
         fluid
         css={{
            d: 'flex',
            fd: 'row',
            gap: '1rem',
            flexWrap: 'no-wrap',
            p: '2rem 0 0 0',
         }}
      >
         <div style={{ minWidth: '8rem', width: '22rem' }}>
            <Image
               src={`${BASE_URL}${IMAGE_SIZE.PROFILE.W632}/${person?.profile_path}`}
               width="100%"
               loading="lazy"
               objectFit="cover"
               alt="Movie Poster"
               css={{ borderRadius: '0.2rem' }}
            ></Image>
         </div>
         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               gap: '1rem',
               flexShrink: '2',
            }}
         >
            <Row>
               <Text
                  h1
                  css={{
                     fontFamily: 'Roboto',
                     fontSize: '2.2rem',
                     letterSpacing: '0.05px',
                  }}
               >
                  {person?.name}
               </Text>
            </Row>
            <Row css={{ width: '80%', fd: 'column' }}>
               {showMore ? (
                  <Text>{person?.biography}</Text>
               ) : (
                  <Text
                     style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        lineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                     }}
                  >
                     {person?.biography}
                  </Text>
               )}
               {person?.biography && (
                  <Button
                     size="sm"
                     light
                     color="primary"
                     animated={false}
                     css={{
                        minWidth: 'auto',
                        alignSelf: 'end',
                        p: '0',
                        width: 'auto',
                     }}
                     onPress={() => setShowMore(state => !state)}
                  >
                     {showMore ? 'Show less' : 'Show more'}
                  </Button>
               )}
            </Row>
            <Row css={{ fd: 'column' }}>
               <Text>Personal info:</Text>
               <Row>
                  <Text style={{ minWidth: '8rem', opacity: '0.7' }}>
                     Known for:
                  </Text>
                  <Text>{person?.known_for_department}</Text>
               </Row>

               {person?.deathday ? (
                  <Row>
                     <Text style={{ minWidth: '8rem', opacity: '0.7' }}>
                        Date of birth:
                     </Text>
                     <Text>
                        {person?.birthday &&
                           format(new Date(person?.birthday), 'dd MMMM y')}
                     </Text>
                  </Row>
               ) : (
                  <Row>
                     <Text style={{ minWidth: '8rem', opacity: '0.7' }}>
                        Age:
                     </Text>
                     <Text>{`${ageCurrently} years old`}</Text>
                  </Row>
               )}

               {person?.deathday ? (
                  <Row>
                     <Text style={{ minWidth: '8rem', opacity: '0.7' }}>
                        Date of death:
                     </Text>
                     <Text>
                        {person?.deathday &&
                           format(new Date(person?.deathday), 'dd MMMM y')}
                        {` (passed away at the age of ${age})`}
                     </Text>
                  </Row>
               ) : (
                  <Row>
                     <Text style={{ minWidth: '8rem', opacity: '0.7' }}>
                        Date of birth:
                     </Text>
                     <Text>
                        {person?.birthday &&
                           format(new Date(person?.birthday), 'dd MMMM y')}
                     </Text>
                  </Row>
               )}

               <Row>
                  <Text style={{ minWidth: '8rem', opacity: '0.7' }}>
                     Place of birth:
                  </Text>
                  <Text>{person?.place_of_birth}</Text>
               </Row>
            </Row>
         </div>
      </Container>
   );
};

export default DetailsHeader;

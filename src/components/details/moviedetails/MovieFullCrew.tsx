import { Container, Text, Row } from '@nextui-org/react';
import CardCastThumbnail from '../../card/CardCastThumbnail';

interface PropTypes {
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

const MovieFullCrew = ({ crew }: PropTypes) => {
   const directing = crew?.filter(person => person.department === 'Directing');
   const writing = crew?.filter(person => person.department === 'Writing');
   const production = crew?.filter(
      person => person.department === 'Production'
   );
   const camera = crew?.filter(person => person.department === 'Camera');
   const sound = crew?.filter(person => person.department === 'Sound');
   const art = crew?.filter(person => person.department === 'Art');
   const costume = crew?.filter(
      person => person.department === 'Costume & Make-Up'
   );
   const effects = crew?.filter(
      person => person.department === 'Visual Effects'
   );
   const editing = crew?.filter(person => person.department === 'Editing');
   const staff = crew?.filter(person => person.department === 'Crew');

   return (
      <Container css={{ p: '1rem 0' }}>
         <Text
            h3
            size={20}
            css={{ borderBottom: '1px solid rgb(100, 100, 100)' }}
         >
            Crew
         </Text>
         {directing?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Directing
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {directing?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {writing?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Writing
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {writing?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {production?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Production
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {production?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {camera?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Camera
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {camera?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {sound?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Sound
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {sound?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {art?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Art
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {art?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {costume?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Costume & Make up
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {costume?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {effects?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Visual Effects
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {effects?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {editing?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Editing
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {editing?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
         {staff?.length > 0 && (
            <Row css={{ d: 'flex', fd: 'column', marginBottom: '2.5rem' }}>
               <Text
                  h4
                  size={15}
                  css={{
                     fontFamily: 'Roboto',
                     letterSpacing: '0.09px',
                     opacity: 0.8,
                  }}
               >
                  Crew
               </Text>
               <Row
                  css={{
                     display: 'grid',
                     gridTemplateColumns:
                        'repeat(auto-fill, minmax(22rem, 1fr))',
                     gap: '1rem',
                  }}
               >
                  {staff?.map(person => (
                     <CardCastThumbnail
                        key={person?.credit_id}
                        person={person}
                     />
                  ))}
               </Row>
            </Row>
         )}
      </Container>
   );
};

export default MovieFullCrew;

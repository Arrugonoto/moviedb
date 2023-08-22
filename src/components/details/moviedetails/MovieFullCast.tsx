import { Container, Row, Text } from '@nextui-org/react';
import CardCastThumbnail from '../../card/CardCastThumbnail';

interface PropTypes {
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
}

const MovieFullCast = ({ cast }: PropTypes) => {
   return (
      <Container css={{ p: '1rem 0', fd: 'column' }}>
         <Text h3 size={20}>
            Cast
         </Text>
         <Row
            css={{
               display: 'grid',
               gridTemplateColumns: 'repeat(auto-fill, minmax(22rem, 1fr))',
               gap: '1rem',
            }}
         >
            {cast?.map(person => (
               <CardCastThumbnail key={person?.id} person={person} />
            ))}
         </Row>
      </Container>
   );
};

export default MovieFullCast;

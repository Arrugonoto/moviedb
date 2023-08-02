import { Text, Card } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';

interface PersonProps {
   person: {
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
   };
}

const CardPersonCast = ({ person }: PersonProps) => {
   const navigate = useNavigate();
   const nameRegex = /:|,|\./g;
   const personFullname: string = person.name
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(nameRegex, '');

   return (
      <article
         style={{ width: '10rem', cursor: 'pointer' }}
         title={`${person.name}`}
      >
         <Card isPressable disableRipple disableAnimation>
            <Card.Image
               src={`https://image.tmdb.org/t/p/w1280${person.profile_path}`}
               objectFit="cover"
               alt="Person Profile"
               css={{
                  transition: 'all 0.2s linear',
                  '&:hover': { scale: 1.2 },
                  cursor: 'grab',
               }}
            />
         </Card>
         <Text
            css={{
               textAlign: 'center',
               fontWeight: '600',
               '&:hover': { textDecoration: 'underline', color: '#9210a0' },
            }}
            onClick={() =>
               navigate(
                  `/${ROUTES.PERSON_DETAILS}/${personFullname}/${person.id}`
               )
            }
         >
            {person.name}
         </Text>
         <Text css={{ color: '#9210a0', textAlign: 'center' }}>
            {person.character}
         </Text>
      </article>
   );
};

export default CardPersonCast;

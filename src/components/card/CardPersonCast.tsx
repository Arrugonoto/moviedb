import { Text, Card } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import { BsFillPersonFill } from 'react-icons/bs';

interface PropTypes {
   person: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id?: number;
      character: string;
      credit_id: string;
      order: number;
   };
}

const CardPersonCast = ({ person }: PropTypes) => {
   const nameRegex = /:|,|\./g;
   const personFullname: string = person.name
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(nameRegex, '');

   return (
      <article
         style={{ width: '9rem', cursor: 'pointer' }}
         title={`${person.name}`}
      >
         <Card
            isPressable
            disableRipple
            disableAnimation
            css={{ w: '100%', height: '12rem' }}
         >
            {person?.profile_path ? (
               <Card.Image
                  src={`https://image.tmdb.org/t/p/w1280${person.profile_path}`}
                  loading="lazy"
                  objectFit="cover"
                  alt="Person Profile"
                  css={{
                     transition: 'all 0.2s linear',
                     '&:hover': { scale: 1.2 },
                     cursor: 'grab',
                  }}
               />
            ) : (
               <div
                  style={{
                     display: 'flex',
                     width: ' 100%',
                     height: '100%',
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: 'rgba(146, 16, 160, 0.3)',
                  }}
               >
                  <BsFillPersonFill
                     style={{ fontSize: '6rem', opacity: 0.4 }}
                  />
               </div>
            )}
         </Card>
         <Link to={`/${ROUTES.PERSON_DETAILS}/${personFullname}/${person.id}`}>
            <Text
               css={{
                  textAlign: 'center',
                  fontWeight: '600',
                  '&:hover': { textDecoration: 'underline', color: '#9210a0' },
               }}
            >
               {person.name}
            </Text>
         </Link>
         <Text css={{ color: '#9210a0', textAlign: 'center' }}>
            {person.character}
         </Text>
      </article>
   );
};

export default CardPersonCast;

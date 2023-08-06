import { Container, Row, Col, Text, Image } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import { MdLocalMovies } from 'react-icons/md';

interface PersonProps {
   person: {
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      profile_path: string;
      cast_id?: number;
      department?: string;
      character?: string;
      credit_id: string;
      job?: string;
   };
}

const CardCastThumbnail = ({ person }: PersonProps) => {
   const navigate = useNavigate();
   const nameRegex = /:|,|\./g;
   const personFullname: string = person?.name
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(nameRegex, '');

   return (
      <Container
         css={{
            br: '0.4rem',
            p: '0',
            ov: 'hidden',
            '&:hover': {
               bc: 'rgba(150,150,150, 0.2)',
            },
         }}
      >
         <article
            key={person?.cast_id}
            style={{
               display: 'flex',
               width: '100%',
               height: '6rem',
               gap: '1rem',
            }}
         >
            <div style={{ width: '6rem' }}>
               {person?.profile_path ? (
                  <Image
                     src={`${
                        BASE_URL +
                        IMAGE_SIZE.PROFILE.W185 +
                        person?.profile_path
                     }`}
                     objectFit="cover"
                     alt="Person profile"
                     css={{ cursor: 'pointer' }}
                     onClick={() =>
                        navigate(
                           `/${ROUTES.PERSON_DETAILS}/${personFullname}/${person?.id}`
                        )
                     }
                  />
               ) : (
                  <div
                     style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(146, 16, 160, 0.3)',
                        cursor: 'pointer',
                     }}
                     onClick={() =>
                        navigate(
                           `/${ROUTES.PERSON_DETAILS}/${personFullname}/${person?.id}`
                        )
                     }
                  >
                     <MdLocalMovies
                        style={{ fontSize: '2rem', opacity: 0.6 }}
                     />
                  </div>
               )}
            </div>
            <Col css={{ d: 'flex', fd: 'column', jc: 'center' }}>
               <Row>
                  <Text
                     size={18}
                     color={
                        person?.name === 'J.R.R. Tolkien'
                           ? 'rgb(64, 197, 24)'
                           : ''
                     }
                     css={{
                        fontWeight: '600',
                        cursor: 'pointer',
                        '&:hover': {
                           textDecoration: 'underline',
                        },
                     }}
                     onClick={() =>
                        navigate(
                           `/${ROUTES.PERSON_DETAILS}/${personFullname}/${person?.id}`
                        )
                     }
                  >
                     {person?.name}
                  </Text>
               </Row>
               <Row>
                  <Text
                     size={15}
                     color="#9210a0"
                     css={{ fontFamily: 'Roboto', letterSpacing: '0.05px' }}
                  >
                     {person?.cast_id ? person?.character : person?.job}
                  </Text>
               </Row>
            </Col>
         </article>
      </Container>
   );
};

export default CardCastThumbnail;

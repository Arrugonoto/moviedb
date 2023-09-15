import { Container, Row, Col, Text, Image, useTheme } from '@nextui-org/react';
import { BASE_URL, IMAGE_SIZE } from '../../data/imageConfig';
import { Link } from 'react-router-dom';
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
      credit_id?: string;
      job?: string;
      roles?: {
         credit_id: string;
         character: string;
         episode_count: number;
      }[];
      jobs?: {
         credit_id: string;
         job: string;
         episode_count: number;
      }[];
   };
}

const CardCastThumbnail = ({ person }: PersonProps) => {
   const { isDark } = useTheme();
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
                  <Link
                     to={`/${ROUTES.PERSON_DETAILS}/${personFullname}/${person?.id}`}
                  >
                     <Image
                        src={`${
                           BASE_URL +
                           IMAGE_SIZE.PROFILE.W185 +
                           person?.profile_path
                        }`}
                        loading="lazy"
                        objectFit="cover"
                        alt="Person profile"
                        css={{ cursor: 'pointer' }}
                     />
                  </Link>
               ) : (
                  <Link
                     to={`/${ROUTES.PERSON_DETAILS}/${personFullname}/${person?.id}`}
                  >
                     <div
                        style={{
                           display: 'flex',
                           width: '100%',
                           height: '100%',
                           justifyContent: 'center',
                           alignItems: 'center',
                           color: 'rgb(180,180,180)',
                           backgroundColor: 'rgba(146, 16, 160, 0.3)',
                           cursor: 'pointer',
                        }}
                     >
                        <MdLocalMovies
                           style={{ fontSize: '2rem', opacity: 0.6 }}
                        />
                     </div>
                  </Link>
               )}
            </div>
            <Col css={{ d: 'flex', fd: 'column', jc: 'center' }}>
               <Row>
                  <Link
                     to={`/${ROUTES.PERSON_DETAILS}/${personFullname}/${person?.id}`}
                  >
                     <Text
                        size={18}
                        color={
                           person?.name === 'J.R.R. Tolkien'
                              ? 'rgb(64, 197, 24)'
                              : isDark
                              ? '$white'
                              : '$black'
                        }
                        css={{
                           fontWeight: '600',
                           cursor: 'pointer',
                           '&:hover': {
                              textDecoration: 'underline',
                           },
                        }}
                     >
                        {person?.name}
                     </Text>
                  </Link>
               </Row>
               <Row>
                  <Text
                     size={15}
                     color="#9210a0"
                     css={{ fontFamily: 'Roboto', letterSpacing: '0.05px' }}
                  >
                     {person?.cast_id ? person?.character : person?.job}

                     {person?.roles?.map((role, i) => (
                        <>
                           {`${role.character}`}
                           <span
                              style={{
                                 fontSize: '0.8rem',
                                 fontWeight: '300',
                                 color: 'rgb(110,110,110)',
                              }}
                           >
                              {` (${role.episode_count}`}
                              {role?.episode_count > 1
                                 ? ' episodes)'
                                 : ' episode)'}
                           </span>
                           {i === (person?.roles?.length as number) - 1
                              ? ''
                              : ', '}
                        </>
                     ))}

                     {person?.jobs?.map((position, i) => (
                        <>
                           {`${position?.job}`}
                           <span
                              style={{
                                 fontSize: '0.8rem',
                                 fontWeight: '300',
                                 color: 'rgb(110,110,110)',
                              }}
                           >
                              {` (${position?.episode_count}`}
                              {position?.episode_count > 1
                                 ? ' episodes)'
                                 : ' episode)'}
                           </span>
                           {i === (person?.jobs?.length as number) - 1
                              ? ''
                              : ', '}
                        </>
                     ))}
                  </Text>
               </Row>
            </Col>
         </article>
      </Container>
   );
};

export default CardCastThumbnail;

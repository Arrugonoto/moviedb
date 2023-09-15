import { ReactElement } from 'react';
import { Card, Text, Col, useTheme } from '@nextui-org/react';
import { FaImage } from 'react-icons/fa';
import style from './movieCard.module.css';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';

interface PropTypes {
   adult?: boolean;
   id: number;
   name: string;
   original_name: string;
   media_type?: string;
   popularity?: number;
   gender?: number;
   known_for_department?: string;
   profile_path: string;
   known_for?: object[];
}

const CardMdBlurPeople = ({
   id,
   name,
   profile_path,
}: PropTypes): ReactElement => {
   const { isDark } = useTheme();
   const nameRegex = /:|,|\./g;
   const personFullname: string = name
      .toLowerCase()
      .split(' ')
      .join('-')
      .replaceAll(nameRegex, '');

   return (
      <article>
         <Card
            isPressable
            allowTextSelectionOnPress={true}
            css={{
               w: '12rem',
               h: '20rem',
               br: '0.3rem',
               ov: 'hidden',
            }}
            className={style.card}
         >
            <Card.Body css={{ p: '0', ov: 'hidden' }}>
               {profile_path ? (
                  <Card.Image
                     src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                     width="100%"
                     objectFit="cover"
                     alt="Movie poster"
                     loading="lazy"
                     className={style.cardImage}
                  />
               ) : (
                  <Col
                     css={{
                        d: 'flex',
                        fd: ' column',
                        w: '100%',
                        h: '100%',
                        jc: 'center',
                        ai: 'center',
                        bc: 'rgba(176, 240, 251, .2)',
                        gap: '.5rem',
                     }}
                  >
                     <Text>No Image Available</Text>
                     <FaImage style={{ fontSize: '2rem' }} />
                  </Col>
               )}

               <Card.Footer
                  isBlurred
                  css={{
                     position: 'absolute',
                     bottom: 0,
                     zIndex: 1,
                     br: '0',
                     h: '2rem',
                     bc: `${
                        isDark ? 'rgba(8, 8, 8, .8)' : 'rgba(250, 250, 250, .8)'
                     }`,
                  }}
               >
                  <Link
                     to={`/${ROUTES.PERSON_DETAILS}/${personFullname}/${id}`}
                     style={{ width: '100%' }}
                  >
                     <Text
                        size={15}
                        css={{
                           ta: 'center',
                           fontWeight: '600',
                           letterSpacing: '0.05px',
                           w: '100%',
                           truncateText: '100%',
                           '&:hover': {
                              tdl: 'underline',
                           },
                        }}
                        title={name}
                     >
                        {name}
                     </Text>
                  </Link>
               </Card.Footer>
            </Card.Body>
         </Card>
      </article>
   );
};

export default CardMdBlurPeople;

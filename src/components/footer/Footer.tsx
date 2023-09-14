import { Container, Text, Row, Image } from '@nextui-org/react';
import LogoTMDB from '../../assets/TMDB_logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
   return (
      <footer
         style={{
            position: 'relative',
            left: '0',
            bottom: '0',
            width: '100%',
            marginTop: '1rem',
         }}
      >
         <section style={{ width: '100%' }}>
            <Container
               fluid
               css={{
                  d: 'flex',
                  jc: 'center',
                  bc: '$violet500',
                  p: '2rem 0',
                  color: '#fafafa',
                  maxWidth: '100%',
               }}
            >
               <Row css={{ width: 'auto', gap: '2rem' }}>
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                     }}
                  >
                     <Text
                        css={{
                           fontFamily: 'Roboto',
                           fontSize: '1rem',
                           fontWeight: '800',
                           letterSpacing: '0.5px',
                           textTransform: 'uppercase',
                           color: '#d2d2d2',
                           paddingBottom: '2rem',
                        }}
                     >
                        made with
                     </Text>
                     <Link to="https://www.themoviedb.org">
                        <Image
                           width="8rem"
                           src={LogoTMDB}
                           alt="The Movie Database - TMDB Logo"
                        />
                     </Link>
                  </div>
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                     }}
                  >
                     <Text
                        css={{
                           fontFamily: 'Roboto',
                           fontSize: '1rem',
                           fontWeight: '800',
                           letterSpacing: '0.5px',
                           textTransform: 'uppercase',
                           color: '#d2d2d2',
                           paddingBottom: '1.5rem',
                        }}
                     >
                        Helpful links
                     </Text>
                     <Link to="https://www.themoviedb.org">
                        <Text
                           css={{
                              fontWeight: '500',
                              color: 'transparent',
                              background: '#fafafa',
                              backgroundClip: 'text',
                              textFillColor: ' transparent',
                              letterSpacing: '0.03px',
                              '&:hover': {
                                 backgroundImage:
                                    'linear-gradient(90deg,rgb(144, 206, 161), rgb(1, 180, 228))',
                              },
                           }}
                        >
                           The Movie Database
                        </Text>
                     </Link>
                     <Link to="https://developer.themoviedb.org/docs">
                        <Text
                           css={{
                              fontWeight: '500',
                              color: 'transparent',
                              background: '#fafafa',
                              backgroundClip: 'text',
                              textFillColor: ' transparent',
                              letterSpacing: '0.03px',
                              '&:hover': {
                                 backgroundImage:
                                    'linear-gradient(90deg,rgb(144, 206, 161), rgb(1, 180, 228))',
                              },
                           }}
                        >
                           The Movie Database API
                        </Text>
                     </Link>
                  </div>
               </Row>
            </Container>
         </section>
      </footer>
   );
};

export default Footer;

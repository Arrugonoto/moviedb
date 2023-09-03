import { Container, Row, Text, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import ROUTES from '../routes/routes';

const NotFound = () => {
   return (
      <section style={{ minHeight: '100dvh', height: '100dvh' }}>
         <Container
            css={{
               d: 'flex',
               fd: 'column',
               height: ' 100%',
               width: '100%',
               jc: 'center',
               ai: 'center',
            }}
         >
            <Row css={{ d: 'flex', width: 'fit-content' }}>
               <Text
                  h1
                  css={{
                     m: '0',
                     fontFamily: 'Roboto',
                     fontSize: '1.8rem',
                     fontWeight: '500',
                     letterSpacing: '0.05px',
                  }}
               >
                  Oopsie.. Looks like You are lost...
               </Text>
            </Row>
            <Row css={{ d: 'flex', width: 'fit-content' }}>
               <Link to={`/${ROUTES.HOME}`}>
                  <Button ghost>
                     <Text
                        h2
                        css={{
                           m: '0',
                           fontFamily: 'Roboto',
                           fontSize: '1.4rem',
                           fontWeight: '500',
                           letterSpacing: '0.05px',
                        }}
                     >
                        Lead me safely to the entrance
                     </Text>
                  </Button>
               </Link>
            </Row>
         </Container>
      </section>
   );
};

export default NotFound;

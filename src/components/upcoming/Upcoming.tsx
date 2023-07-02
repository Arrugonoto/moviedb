import { Container, Row, Text } from '@nextui-org/react';

const Upcoming = () => {
   return (
      <section style={{ width: '100%' }}>
         <Container fluid css={{ minHeight: '28rem' }}>
            <Row>
               <Text
                  h1
                  size={26}
                  css={{
                     textGradient: '45deg, $primary 20%, $accent600 100%',
                     letterSpacing: '0.5px',
                  }}
               >
                  Upcoming Movies
               </Text>
            </Row>

            <Row css={{ br: '0.3rem' }}></Row>
         </Container>
      </section>
   );
};

export default Upcoming;
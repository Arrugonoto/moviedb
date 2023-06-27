import { useState } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import PopularMovies from './PopularMovies';
import PopularSeries from './PopularSeries';

const Popular = () => {
   const [displayPopular, setDisplayPopular] = useState<string>('movies');

   return (
      <section>
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
                  Most watched now
               </Text>
            </Row>
            <Row justify="center">
               <Button.Group light rounded size="lg">
                  <Button
                     onPress={() => setDisplayPopular('movies')}
                     css={{
                        color: displayPopular === 'movies' ? '#9210a0' : '',
                     }}
                  >
                     Movies
                  </Button>
                  <Button
                     onPress={() => setDisplayPopular('series')}
                     css={{
                        color: displayPopular === 'series' ? '#9210a0' : '',
                     }}
                  >
                     TV Series
                  </Button>
               </Button.Group>
            </Row>
            <Row css={{ br: '0.3rem' }}>
               {displayPopular === 'movies' && <PopularMovies />}
               {displayPopular === 'series' && <PopularSeries />}
            </Row>
         </Container>
      </section>
   );
};

export default Popular;

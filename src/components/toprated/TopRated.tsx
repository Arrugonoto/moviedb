import { useState } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import TopRatedMovies from './TopRatedMovies';
import TopRatedSeries from './TopRatedSeries';

const TopRated = () => {
   const [displayTopRated, setDisplayTopRated] = useState<string>('movies');

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
                  Top selections
               </Text>
            </Row>
            <Row justify="center">
               <Button.Group light rounded size="lg">
                  <Button
                     onPress={() => setDisplayTopRated('movies')}
                     css={{
                        color: displayTopRated === 'movies' ? '#9210a0' : '',
                     }}
                  >
                     Movies
                  </Button>
                  <Button
                     onPress={() => setDisplayTopRated('series')}
                     css={{
                        color: displayTopRated === 'series' ? '#9210a0' : '',
                     }}
                  >
                     TV Series
                  </Button>
               </Button.Group>
            </Row>
            <Row css={{ br: '0.3rem' }}>
               {displayTopRated === 'movies' && <TopRatedMovies />}
               {displayTopRated === 'series' && <TopRatedSeries />}
            </Row>
         </Container>
      </section>
   );
};

export default TopRated;

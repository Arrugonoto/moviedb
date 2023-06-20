import { useState } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import TrendingMovies from './TrendingMovies';
import TrendingSeries from './TrendingSeries';
import TrendingPeople from './TrendingPeople';

const Trending = () => {
   const [displayTrending, setDisplayTrending] = useState('movies');

   return (
      <section>
         <Container fluid>
            <Row>
               <Text>Trending</Text>
            </Row>
            <Row>
               <Button.Group>
                  <Button onClick={() => setDisplayTrending('movies')}>
                     Movies
                  </Button>
                  <Button onClick={() => setDisplayTrending('series')}>
                     TV Series
                  </Button>
                  <Button onClick={() => setDisplayTrending('people')}>
                     People
                  </Button>
               </Button.Group>
            </Row>
            <Row>
               {displayTrending === 'movies' && <TrendingMovies />}
               {displayTrending === 'series' && <TrendingSeries />}
               {displayTrending === 'people' && <TrendingPeople />}
            </Row>
         </Container>
      </section>
   );
};

export default Trending;

import { useState } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import TrendingMovies from './TrendingMovies';
import TrendingSeries from './TrendingSeries';
import TrendingPeople from './TrendingPeople';
import style from './trending.module.css';

const Trending = () => {
   const [displayTrending, setDisplayTrending] = useState<string>('movies');

   return (
      <section style={{ width: '100%' }}>
         <Container fluid css={{ minHeight: '28rem', width: '100%' }}>
            <Row>
               <Text
                  h1
                  size={26}
                  css={{
                     textGradient: '45deg, $primary 20%, $accent600 100%',
                     letterSpacing: '0.5px',
                  }}
               >
                  Trending
               </Text>
            </Row>
            <Row justify="center">
               <Button.Group light rounded size="lg">
                  <Button
                     onPress={() => setDisplayTrending('movies')}
                     className={`${style.trendingBtn} ${
                        displayTrending === 'movies'
                           ? style.selectedCategory
                           : ''
                     }`}
                  >
                     Movies
                  </Button>
                  <Button
                     onPress={() => setDisplayTrending('series')}
                     className={`${style.trendingBtn} ${
                        displayTrending === 'series'
                           ? style.selectedCategory
                           : ''
                     }`}
                  >
                     TV Series
                  </Button>
                  <Button
                     onPress={() => setDisplayTrending('people')}
                     className={`${style.trendingBtn} ${
                        displayTrending === 'people'
                           ? style.selectedCategory
                           : ''
                     }`}
                  >
                     People
                  </Button>
               </Button.Group>
            </Row>
            <Row css={{ br: '0.3rem' }}>
               {displayTrending === 'movies' && <TrendingMovies />}
               {displayTrending === 'series' && <TrendingSeries />}
               {displayTrending === 'people' && <TrendingPeople />}
            </Row>
         </Container>
      </section>
   );
};

export default Trending;

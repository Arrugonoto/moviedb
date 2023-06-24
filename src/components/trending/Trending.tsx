import { useState } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import TrendingMovies from './TrendingMovies';
import TrendingSeries from './TrendingSeries';
import TrendingPeople from './TrendingPeople';
import style from './trending.module.css';

const Trending = () => {
   const [displayTrending, setDisplayTrending] = useState<string>('movies');

   return (
      <section>
         <Container fluid>
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
                     css={{
                        color: displayTrending === 'movies' ? '#9210a0' : '',
                     }}
                     className={style.trendingBtn}
                  >
                     Movies
                  </Button>
                  <Button
                     onPress={() => setDisplayTrending('series')}
                     css={{
                        color: displayTrending === 'series' ? '#9210a0' : '',
                     }}
                     className={style.trendingBtn}
                  >
                     TV Series
                  </Button>
                  <Button
                     onPress={() => setDisplayTrending('people')}
                     css={{
                        color: displayTrending === 'people' ? '#9210a0' : '',
                     }}
                     className={style.trendingBtn}
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

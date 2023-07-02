import { Container } from '@nextui-org/react';
import Trending from '../components/trending/Trending';
import Popular from '../components/popular/Popular';
import TopRated from '../components/toprated/TopRated';
import Upcoming from '../components/upcoming/Upcoming';
import NowPlaying from '../components/nowplaying/NowPlaying';

const Home = () => {
   return (
      <Container
         fluid
         css={{
            d: 'flex',
            fd: 'column',
            gap: '3rem',
            p: '.5rem',
         }}
      >
         <Trending />
         <Upcoming />
         <NowPlaying />
         <Popular />
         <TopRated />
      </Container>
   );
};

export default Home;

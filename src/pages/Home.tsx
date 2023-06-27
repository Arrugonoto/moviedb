import { Container } from '@nextui-org/react';
import Trending from '../components/trending/Trending';
import Popular from '../components/popular/Popular';
import TopRated from '../components/toprated/TopRated';

const Home = () => {
   return (
      <Container fluid css={{ d: 'flex', fd: 'column', gap: '3rem' }}>
         <Trending />
         <Popular />
         <TopRated />
      </Container>
   );
};

export default Home;

import { Container, Row, Text } from '@nextui-org/react';
import SearchResultsSection from '../components/search/SearchResultsSection';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
   const [searchParams] = useSearchParams();
   const queryString = searchParams.get('q');

   return (
      <section style={{ minHeight: '100dvh' }}>
         <Container
            css={{ d: 'flex', fd: 'column', m: '0', p: '0', gap: '1rem' }}
         >
            <Row css={{ justifyContent: 'center' }}>
               <Text h1 css={{ fontSize: '1.8rem', fontWeight: '600' }}>
                  Search results for:{' '}
                  <span style={{ color: '#9210A0' }}>{queryString}</span>
               </Text>
            </Row>
            <Row>
               <SearchResultsSection />
            </Row>
         </Container>
      </section>
   );
};

export default SearchResults;

import { Container } from '@nextui-org/react';
import CardSearchResult from '../../card/CardSearchResult';

interface PropTypes {
   results: {
      adult: boolean;
      id: number;
      name?: string;
      original_name?: string;
      media_type: string;
      popularity: number;
      gender?: number;
      known_for_department: string;
      profile_path: string;
      known_for?: {
         adult: boolean;
         backdrop_path: string;
         id: number;
         title: string;
         original_language: string;
         original_title: string;
         name: string;
         original_name: string;
         overview: string;
         poster_path: string;
         media_type: string;
         genre_ids: number[];
         popularity: number;
         release_date: string;
         video: boolean;
         vote_average: number;
         vote_count: number;
      }[];
      backdrop_path: string;
      title?: string;
      original_title?: string;
      original_language: string;
      overview: string;
      poster_path: string;
      genre_ids?: number[];
      release_date?: string;
      video: false;
      vote_average: number;
      vote_count: number;
      first_air_date?: string;
      origin_country?: string[];
   }[];
}

const ResultsSummary = ({ results }: PropTypes) => {
   return (
      <Container fluid css={{ d: 'flex', fd: 'column', gap: '1rem' }}>
         {results?.map(result => (
            <CardSearchResult key={result?.id} result={result} />
         ))}
      </Container>
   );
};

export default ResultsSummary;

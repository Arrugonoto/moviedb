import { useEffect, useRef } from 'react';
import { Container, Row, Col, Text, useTheme } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import DetailsHeader from './moviedetails/DetailsHeader';
import MainCrew from './moviedetails/MainCrew';
import Cast from './moviedetails/Cast';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface CreditsTypes {
   cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
   }[];
   crew: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
   }[];
}

interface MovieDetailsTypes {
   adult: boolean;
   backdrop_path: string;
   belongs_to_collection: unknown;
   budget: number;
   genres: { id: number; name: string }[];
   homepage: string;
   id: number;
   imdb_id: string;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
   }[];
   production_countries: { iso_3166_1: string; name: string }[];
   release_date: string;
   revenue: number;
   runtime: number;
   spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
   }[];
   status: string;
   tagline: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
   credits: CreditsTypes;
}

const MovieDetailsSection = () => {
   const { movieId } = useParams();
   const { isDark } = useTheme();
   const { handleFetch, data } = useFetch<MovieDetailsTypes>(
      {} as MovieDetailsTypes
   );
   const { credits } = data;
   const castContainerRef = useRef<HTMLDivElement>(null);
   const director = credits?.crew?.filter(person => person.job === 'Director');
   const screenplay = credits?.crew?.filter(
      person => person.job === 'Screenplay'
   );

   const fetchDetails = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchDetails();
      window.scrollTo({
         top: 0,
      });
      // eslint-disable-next-line
   }, []);

   return (
      <Container fluid>
         <DetailsHeader
            backdropPath={data?.backdrop_path}
            voteAverage={data?.vote_average}
            voteCount={data?.vote_count}
            posterPath={data?.poster_path}
            title={data?.title}
            releaseDate={data?.release_date}
            runtime={data?.runtime}
         />
         <MainCrew
            genres={data?.genres}
            overview={data?.overview}
            director={director}
            screenplay={screenplay}
            productionCountries={data?.production_countries}
            releaseDate={data?.release_date}
         />
         <Cast cast={data?.credits?.cast} />
         <Row css={{ p: '2rem 0' }}>
            <Text
               h3
               css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
            >
               Photos
            </Text>
            <Row></Row>
         </Row>
         <Row css={{ p: '2rem 0' }}>
            <Text
               h3
               css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
            >
               Review
            </Text>
            <Row></Row>
         </Row>
         <Row css={{ p: '2rem 0' }}>
            <Text
               h3
               css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
            >
               Information
            </Text>
            <Row></Row>
         </Row>
         <Row css={{ p: '2rem 0' }}>
            <Text
               h3
               css={{ borderLeft: '5px solid #9210a0', paddingLeft: '0.4rem' }}
            >
               Recommendations
            </Text>
            <Row></Row>
         </Row>
      </Container>
   );
};

export default MovieDetailsSection;

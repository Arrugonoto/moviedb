import { useEffect } from 'react';
import { Container, Row, Text, Button } from '@nextui-org/react';
import { useParams, useNavigate } from 'react-router-dom';
import { METHODS } from '../../services/api';
import { API_KEY } from '../../services/api-key';
import useFetch from '../../hooks/useFetch';
import DetailsHeader from './tvshowdetails/DetailsHeader';
import MainCrew from './moviedetails/MainCrew';
import Cast from './moviedetails/Cast';
import Recommendations from './recommendations/Recommendations';
import Similar from './similar/Similar';
import Information from './moviedetails/Information';
import MovieReview from './moviedetails/MovieReview';
import ROUTES from '../../routes/routes';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface ImagesTypes {
   backdrops: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
   }[];
   logos: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
   }[];
   posters: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
   }[];
}

interface SeriesDetailsTypes {
   adult: boolean;
   backdrop_path: string;
   created_by: {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string;
   }[];
   episode_run_time: number[];
   first_air_date: string;
   genres: {
      id: number;
      name: string;
   }[];
   homepage: string;
   id: number;
   in_production: boolean;
   languages: string[];
   last_air_date: string;
   last_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      vote_average: number;
      vote_count: number;
      air_date: string;
      episode_number: number;
      episode_type: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string;
   };
   name: string;
   next_episode_to_air: unknown;
   networks: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
   }[];
   number_of_episodes: number;
   number_of_seasons: number;
   origin_country: string[];
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   production_companies: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
   }[];

   production_countries: {
      iso_3166_1: string;
      name: string;
   }[];
   seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
   }[];
   spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
   }[];
   status: string;
   tagline: string;
   type: string;
   vote_average: number;
   vote_count: number;
   images: ImagesTypes;
}

const SeriesDetailsSection = () => {
   const { tvShowId, tvShowTitle } = useParams();
   const navigate = useNavigate();
   const { handleFetch, data } = useFetch<SeriesDetailsTypes>(
      {} as SeriesDetailsTypes
   );

   const fetchDetails = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };

      const url = `https://api.themoviedb.org/3/tv/${tvShowId}?append_to_response=images&?language=en-US`;

      handleFetch({ url, options });
   };

   useEffect(() => {
      fetchDetails();
      // eslint-disable-next-line
   }, [tvShowId]);

   return (
      <Container fluid css={{ minHeight: '100dvh' }}>
         <DetailsHeader
            backdropPath={data?.backdrop_path}
            firstAirDate={data?.first_air_date}
            name={data?.name}
            voteAverage={data?.vote_average}
            voteCount={data?.vote_count}
            tagline={data?.tagline}
            posters={data?.images?.posters}
         />
      </Container>
   );
};

export default SeriesDetailsSection;

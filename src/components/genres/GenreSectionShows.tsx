import { useState, useRef, useEffect } from 'react';
import { Grid, Container } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../../services/api-key';
import { METHODS } from '../../services/api';
import CardMdBlur from '../card/CardMdBlur';
import SelectFilter from './SelectFilter';
import useInfiniteFetch from '../../hooks/useInfiniteFetch';
import { useIntersection } from '@mantine/hooks';

interface OptionsTypes {
   method: string;
   headers: {
      accept: string;
      Authorization: string;
   };
}

interface SeriesTypes {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   id: number;
   original_language: string;
   original_name: string;
   overview: string;
   popularity: number;
   poster_path: string;
   first_air_date: string;
   name: string;
   vote_average: number;
   vote_count: number;
   media_type: string;
   origin_country: string[];
}

const GenreSectionShows = () => {
   const { genreId } = useParams();
   const [page, setPage] = useState<number>(1);
   const [sortType, setSortType] = useState<string>('popularity.desc');
   const { handleFetch, data, setData, lastPage } = useInfiniteFetch<
      SeriesTypes[]
   >([]);
   const lastShowRef = useRef<HTMLElement>(null);

   const fetchData = async (): Promise<void> => {
      const options: OptionsTypes = {
         method: METHODS.GET,
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY.access_token}`,
         },
      };
      const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sortType}&with_genres=${genreId}`;

      console.log('fetched');

      handleFetch({ url, options });
   };

   const { ref, entry } = useIntersection({
      root: lastShowRef.current,
      threshold: 1,
   });

   useEffect(() => {
      setData([]);
      setPage(1);
      fetchData();
      console.log('fired');
      // eslint-disable-next-line
   }, [genreId, sortType]);

   useEffect(() => {
      if (page !== 1) {
         fetchData();
      }
      // eslint-disable-next-line
   }, [page]);

   useEffect(() => {
      if (entry?.isIntersecting && page < lastPage) setPage(prev => prev + 1);
      // eslint-disable-next-line
   }, [entry]);

   return (
      <Container direction="column" fluid={true}>
         <Container fluid={true}>
            <SelectFilter setSortType={setSortType} />
         </Container>
         <Grid.Container gap={2} justify="center">
            {data?.map((show, i) => {
               if (i === data.length - 3)
                  return (
                     <Grid key={show.id} ref={ref}>
                        <CardMdBlur
                           id={show?.id}
                           overview={show?.overview}
                           popularity={show?.popularity}
                           poster_path={show?.poster_path}
                           first_air_date={show?.first_air_date}
                           name={show?.name}
                           vote_average={show?.vote_average}
                           vote_count={show?.vote_count}
                        ></CardMdBlur>
                     </Grid>
                  );
               return (
                  <Grid key={show.id}>
                     <CardMdBlur
                        id={show?.id}
                        overview={show?.overview}
                        popularity={show?.popularity}
                        poster_path={show?.poster_path}
                        first_air_date={show?.first_air_date}
                        name={show?.name}
                        vote_average={show?.vote_average}
                        vote_count={show?.vote_count}
                     ></CardMdBlur>
                  </Grid>
               );
            })}
         </Grid.Container>
      </Container>
   );
};

export default GenreSectionShows;

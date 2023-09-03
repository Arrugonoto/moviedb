const ROUTES: { [key: string]: string } = {
   HOME: 'moviedb',
   SEARCH: 'moviedb/search',
   MOVIES: 'moviedb/movies',
   MOVIE_GENRE: 'moviedb/movie/genre', //moviedb/movie/genre/id
   MOVIES_POPULAR: 'moviedb/popular/movie',
   MOVIES_TOP_RATED: 'moviedb/top-rated/movie',
   MOVIES_UPCOMING: 'moviedb/upcoming/movies',
   MOVIE_DETAILS: 'moviedb/movie/details', //moviedb/movie/details/movie-name/id
   SERIES: 'moviedb/series',
   SERIES_GENRE: 'moviedb/series/genre',
   SERIES_POPULAR: 'moviedb/popular/series',
   SERIES_TOP_RATED: 'moviedb/top-rated/tv-series',
   SERIES_DETAILS: 'moviedb/series/details', // moviedb/series/details/series-name/id
   PEOPLE: 'moviedb/person',
   PERSON_DETAILS: 'moviedb/person/details', //moviedb/person/details/name-surname/id
};

export default ROUTES;

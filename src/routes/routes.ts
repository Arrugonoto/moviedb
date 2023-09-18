const ROUTES: { [key: string]: string } = {
   HOME: '',
   SEARCH: 'search',
   MOVIES: 'movies',
   MOVIE_GENRE: 'movie/genre', //moviedb/movie/genre/id
   MOVIES_POPULAR: 'popular/movie',
   MOVIES_TOP_RATED: 'top-rated/movie',
   MOVIES_UPCOMING: 'upcoming/movies',
   MOVIE_DETAILS: 'movie/details', //moviedb/movie/details/movie-name/id
   SERIES: 'series',
   SERIES_GENRE: 'series/genre',
   SERIES_POPULAR: 'popular/series',
   SERIES_TOP_RATED: 'top-rated/tv-series',
   SERIES_DETAILS: 'series/details', // moviedb/series/details/series-name/id
   PEOPLE: 'person',
   PERSON_DETAILS: 'person/details', //moviedb/person/details/name-surname/id
};

export default ROUTES;

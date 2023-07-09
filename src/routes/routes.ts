const ROUTES: { [key: string]: string } = {
   HOME: 'moviedb',
   MOVIES: 'moviedb/movies',
   MOVIE_GENRE: 'moviedb/movie/genre',
   MOVIES_POPULAR: 'moviedb/popular/movie',
   MOVIES_TOP_RATED: 'moviedb/top-rated/movie',
   MOVIES_UPCOMING: 'moviedb/upcoming/movies',
   MOVIE_DETAILS: 'moviedb/movie/details', // /movie-title/id
   SERIES: 'moviedb/series',
   SERIES_GENRE: 'moviedb/series/genre',
   SERIES_POPULAR: 'moviedb/popular/series',
   SERIES_TOP_RATED: 'moviedb/top-rated/tv-series',
   SERIES_DETAILS: 'moviedb/series/details', // /series-title/id
   PEOPLE: 'moviedb/person',
   PERSON_DETAILS: 'moviedb/person/details', // /name-surname/id
};

export default ROUTES;

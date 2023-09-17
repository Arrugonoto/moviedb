import ROUTES from '../routes/routes';

export const SUBMENU: { [key: string]: { name: string; route: string }[] } = {
   MOVIES: [
      { name: 'Popular', route: ROUTES.MOVIES_POPULAR },
      { name: 'Upcoming', route: ROUTES.MOVIES_UPCOMING },
      { name: 'Top Rated', route: ROUTES.MOVIES_TOP_RATED },
   ],
   SERIES: [
      { name: 'Popular', route: ROUTES.SERIES_POPULAR },
      { name: 'Top Rated', route: ROUTES.SERIES_TOP_RATED },
   ],
   TMDB: [
      { name: 'Home', route: 'https://www.themoviedb.org/' },
      { name: 'TMDB API', route: 'https://developer.themoviedb.org/docs' },
   ],
};

export const MENU_ITEMS: { name: string; route: string }[] = [
   { name: 'Movies', route: '' },
   { name: 'Popular Movies', route: ROUTES.MOVIES_POPULAR },
   { name: 'Upcoming Movies', route: ROUTES.MOVIES_UPCOMING },
   { name: 'Top Rated Movies', route: ROUTES.MOVIES_TOP_RATED },
   { name: 'TV Shows', route: '' },
   { name: 'Popular Shows', route: ROUTES.SERIES_POPULAR },
   { name: 'Top Rated Shows', route: ROUTES.SERIES_TOP_RATED },
   { name: 'People', route: '' },
   { name: 'The Movie Database', route: 'https://www.themoviedb.org/' },
   { name: 'TMDB API', route: 'https://developer.themoviedb.org/docs' },
];

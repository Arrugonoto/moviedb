import ROUTES from '../routes/routes';

export const MOVIES: { name: string; route: string }[] = [
   { name: 'Popular', route: ROUTES.MOVIES_POPULAR },
   { name: 'Upcoming', route: ROUTES.MOVIES_UPCOMING },
   { name: 'Top Rated', route: ROUTES.MOVIES_TOP_RATED },
];

export const SERIES: { name: string; route: string }[] = [
   { name: 'Popular', route: ROUTES.SERIES_POPULAR },
   { name: 'Top Rated', route: ROUTES.SERIES_TOP_RATED },
];

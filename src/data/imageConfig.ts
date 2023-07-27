// Image path and sizes based on The Movie Database - TMDB API Documentation
// https://developer.themoviedb.org/reference/configuration-details

export const BASE_URL = 'https://image.tmdb.org/t/p/';

export const IMAGE_SIZE: { [key: string]: { [key: string]: string } } = {
   BACKDROP: {
      W300: 'w300',
      W780: 'w780',
      W1280: 'w1280',
      ORIGINAL: 'original',
   },
   POSTER: {
      W92: 'w92',
      W154: 'w154',
      W185: 'w185',
      W342: 'w342',
      W500: 'w500',
      W780: 'w780',
      ORIGINAL: 'original',
   },
};

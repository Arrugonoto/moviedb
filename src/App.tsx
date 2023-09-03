import { useEffect, useState } from 'react';

// react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// nextui

import {
   NextUIProvider,
   getDocumentTheme,
   Container,
   Spacer,
} from '@nextui-org/react';

// components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// pages
import Home from './pages/Home';
import Genre from './pages/Genre';
import MovieDetails from './pages/details/MovieDetails';
import TopRatedSeries from './pages/toprated/TopRatedSeries';
import TopRatedMovies from './pages/toprated/TopRatedMovies';
import Movies from './pages/category/Movies';
import PopularMovies from './pages/popular/PopularMovies';
import UpcomingMovies from './pages/upcoming/UpcomingMovies';
import TvShows from './pages/category/TvShows';
import PopularSeries from './pages/popular/PopularSeries';
import People from './pages/category/People';
import PersonDetails from './pages/details/PersonDetails';
import TvShowDetails from './pages/details/TvShowDetails';
import MovieCredits from './pages/castandcrew/MovieCredits';
import MovieReviews from './pages/reviews/MovieReviews';
import TvShowCredits from './pages/castandcrew/TvShowCredits';
import TvShowReviews from './pages/reviews/TvShowReviews';
import TvShowSeason from './pages/tvshow/TvShowSeason';
import PersonFilmography from './pages/details/PersonFilmography';
import NotFound from './pages/NotFound';
import SearchResults from './pages/SearchResults';

// routes
import ROUTES from './routes/routes';

// theme
import { lightTheme, darkTheme } from './theme/theme';

function App() {
   const [isDark, setIsDark] = useState<boolean>(true);

   useEffect(() => {
      const theme: string | null = window.localStorage.getItem('data-theme');
      setIsDark(theme === 'dark');

      const observer: MutationObserver = new MutationObserver(mutation => {
         const newTheme: string = getDocumentTheme(document?.documentElement);
         setIsDark(newTheme === 'dark');
      });

      observer.observe(document?.documentElement, {
         attributes: true,
         attributeFilter: ['data-theme', 'style'],
      });
      return () => observer.disconnect();
      // eslint-disable-next-line
   }, []);

   return (
      <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
         <div className="App">
            <Container
               css={{ d: 'flex', fd: 'column', ai: 'center', p: '0' }}
               fluid
               responsive={false}
            >
               <BrowserRouter>
                  <Header />
                  <Spacer y={1} />
                  <main
                     style={{
                        maxWidth: '1500px',
                        width: '100%',
                        padding: '0rem 1rem',
                     }}
                  >
                     <Routes>
                        <Route
                           path="/"
                           element={<Navigate replace to={`/${ROUTES.HOME}`} />}
                        />
                        <Route path={ROUTES.HOME} element={<Home />} />
                        <Route path={ROUTES.MOVIES} element={<Movies />} />
                        <Route
                           path={`${ROUTES.MOVIE_GENRE}/:genreId`}
                           element={<Genre />}
                        />
                        <Route
                           path={ROUTES.MOVIES_POPULAR}
                           element={<PopularMovies />}
                        />
                        <Route
                           path={ROUTES.MOVIES_UPCOMING}
                           element={<UpcomingMovies />}
                        />
                        <Route
                           path={ROUTES.MOVIES_TOP_RATED}
                           element={<TopRatedMovies />}
                        />
                        <Route path={ROUTES.SERIES} element={<TvShows />} />
                        <Route
                           path={ROUTES.SERIES_POPULAR}
                           element={<PopularSeries />}
                        />
                        <Route
                           path={ROUTES.SERIES_TOP_RATED}
                           element={<TopRatedSeries />}
                        />
                        <Route path={ROUTES.PEOPLE} element={<People />} />
                        <Route
                           path={`${ROUTES.MOVIE_DETAILS}/:movieTitle/:movieId/`}
                           element={<MovieDetails />}
                        />
                        <Route
                           path={`${ROUTES.MOVIE_DETAILS}/:movieTitle/:movieId/cast-and-crew`}
                           element={<MovieCredits />}
                        />
                        <Route
                           path={`${ROUTES.MOVIE_DETAILS}/:movieTitle/:movieId/reviews`}
                           element={<MovieReviews />}
                        />
                        <Route
                           path={`${ROUTES.SERIES_DETAILS}/:tvShowTitle/:tvShowId`}
                           element={<TvShowDetails />}
                        />
                        <Route
                           path={`${ROUTES.SERIES_DETAILS}/:tvShowTitle/:tvShowId/cast-and-crew`}
                           element={<TvShowCredits />}
                        />
                        <Route
                           path={`${ROUTES.SERIES_DETAILS}/:tvShowTitle/:tvShowId/reviews`}
                           element={<TvShowReviews />}
                        />
                        <Route
                           path={`${ROUTES.SERIES_DETAILS}/:tvShowTitle/:tvShowId/season/:tvShowSeason`}
                           element={<TvShowSeason />}
                        />
                        <Route
                           path={`${ROUTES.PERSON_DETAILS}/:personName/:personId`}
                           element={<PersonDetails />}
                        />
                        <Route
                           path={`${ROUTES.PERSON_DETAILS}/:personName/:personId/filmography`}
                           element={<PersonFilmography />}
                        />
                        <Route path="*" element={<NotFound />}></Route>
                     </Routes>
                  </main>
                  <Spacer y={1} />
                  <Footer />
               </BrowserRouter>
            </Container>
         </div>
      </NextUIProvider>
   );
}

export default App;

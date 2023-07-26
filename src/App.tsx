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

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// pages
import Home from './pages/Home';
import Genre from './pages/Genre';
import MovieDetails from './pages/MovieDetails';
import TopRatedSeries from './pages/TopRatedSeries';
import TopRatedMovies from './pages/TopRatedMovies';
import Movies from './pages/Movies';
import PopularMovies from './pages/PopularMovies';
import UpcomingMovies from './pages/UpcomingMovies';
import Series from './pages/Series';
import PopularSeries from './pages/PopularSeries';
import People from './pages/People';
import PersonDetails from './pages/PersonDetails';
import TvShowDetails from './pages/TvShowDetails';
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
                        <Route path={ROUTES.SERIES} element={<Series />} />
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
                           path={`${ROUTES.MOVIE_DETAILS}/:movieTitle/:movieId`}
                           element={<MovieDetails />}
                        />
                        <Route
                           path={`${ROUTES.SERIES_DETAILS}/:tvShowTitle/:tvShowId`}
                           element={<TvShowDetails />}
                        />
                        <Route
                           path={`${ROUTES.PERSON_DETAILS}/:personName/:personId`}
                           element={<PersonDetails />}
                        />
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

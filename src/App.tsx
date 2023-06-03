import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
   NextUIProvider,
   getDocumentTheme,
   Container,
   Spacer,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Genre from './pages/Genre';
import MovieDetails from './pages/MovieDetails';
import TopRated from './pages/TopRated';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ROUTES from './routes/routes';
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
               css={{ d: 'flex', fd: 'column', ai: 'center' }}
               fluid
               responsive={false}
            >
               <BrowserRouter>
                  <Header />
                  <Spacer y={1} />
                  <main>
                     <Routes>
                        <Route
                           path="/"
                           element={<Navigate replace to={`/${ROUTES.HOME}`} />}
                        ></Route>
                        <Route path={ROUTES.HOME} element={<Home />}></Route>
                        <Route
                           path={`${ROUTES.GENRE}/:genre`}
                           element={<Genre />}
                        ></Route>
                        <Route
                           path={ROUTES.TOP_RATED}
                           element={<TopRated />}
                        ></Route>
                        <Route
                           path={ROUTES.MOVIE_DETAILS}
                           element={<MovieDetails />}
                        ></Route>
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

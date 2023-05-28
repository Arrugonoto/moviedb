import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Genre from './pages/Genre';
import MovieDetails from './pages/MovieDetails';
import TopRated from './pages/TopRated';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ROUTES from './routes/routes';

function App() {
   return (
      <div className="App">
         <Header />
         <main>
            <BrowserRouter>
               <Routes>
                  <Route
                     path="/"
                     element={<Navigate replace to={`/${ROUTES.HOME}`} />}
                  ></Route>
                  <Route path={ROUTES.HOME} element={<Home />}></Route>
                  <Route path={ROUTES.GENRE} element={<Genre />}></Route>
                  <Route path={ROUTES.TOP_RATED} element={<TopRated />}></Route>
                  <Route
                     path={ROUTES.MOVIE_DETAILS}
                     element={<MovieDetails />}
                  ></Route>
               </Routes>
            </BrowserRouter>
         </main>
         <Footer />
      </div>
   );
}

export default App;

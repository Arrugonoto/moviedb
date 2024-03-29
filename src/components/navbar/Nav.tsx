import { useState, useEffect, useRef } from 'react';
import {
   Navbar,
   Text,
   Switch,
   changeTheme,
   useTheme,
   Container,
   Image,
   Link,
} from '@nextui-org/react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { GENRES, SERIES_GENRES } from '../../data/genres';
import { IoMoon } from 'react-icons/io5';
import { IoMdSunny } from 'react-icons/io';
import Logo from '../../assets/logo.svg';
import ROUTES from '../../routes/routes';
import Dropdown from './Dropdown';
import { SUBMENU, MENU_ITEMS } from '../../data/subMenu';
import SearchInput from './SearchInput';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = () => {
   const { isDark } = useTheme();
   const [movieGenres, setMovieGenres] = useState<boolean>(true);
   const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
   const genreContainerRef = useRef<HTMLDivElement>(null);

   const handleChange = () => {
      const nextTheme = isDark ? 'light' : 'dark';
      window.localStorage.setItem('data-theme', nextTheme);
      changeTheme(nextTheme);
   };

   useEffect(() => {
      setIsFirstRender(false);
   }, []);

   useEffect(() => {
      if (genreContainerRef.current) {
         genreContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
         });
      }
   }, [movieGenres]);

   return (
      <Navbar
         maxWidth="fluid"
         css={{ py: '.4rem' }}
         height="auto"
         variant="sticky"
         shouldHideOnScroll
      >
         <Container
            fluid
            css={{
               fd: 'column',
               p: '0 0.2rem',
               maxWidth: '1500px',
            }}
         >
            <Container
               fluid
               responsive
               css={{
                  d: 'flex',
                  flexDirection: 'row',
                  jc: 'space-between',
                  ai: 'center',
                  p: '0',
                  m: '0',
                  width: '100%',
                  maxWidth: '1500px',
               }}
            >
               <Navbar.Brand css={{ gap: '0.5rem' }}>
                  <Navbar.Toggle
                     aria-label="toggle navigation"
                     css={{ '@smMin': { display: 'none' } }}
                  />
                  <NavLink to={ROUTES.HOME}>
                     <Image
                        src={Logo}
                        alt="MovieDB - app logo"
                        css={{
                           width: '9rem',
                           cursor: 'pointer',
                           transition: '0.3s width linear',
                           '@xsMax': {
                              width: '8rem',
                           },
                        }}
                     />
                  </NavLink>
               </Navbar.Brand>
               <Navbar.Content
                  css={{
                     gap: '1rem',
                     '@smMax': {
                        display: 'none',
                     },
                  }}
               >
                  <Navbar.Item>
                     <div className={styles.categoryLinkWrapper}>
                        <NavLink
                           to={ROUTES.MOVIES}
                           style={{
                              color: `${isDark ? '#fafafa' : '#000000'}`,
                           }}
                           className={styles.categoryLink}
                        >
                           Movies
                        </NavLink>
                        <Dropdown data={SUBMENU.MOVIES} />
                     </div>
                  </Navbar.Item>
                  <Navbar.Item>
                     <div className={styles.categoryLinkWrapper}>
                        <NavLink
                           to={ROUTES.SERIES}
                           style={{
                              color: `${isDark ? '#fafafa' : '#000000'}`,
                           }}
                           className={styles.categoryLink}
                        >
                           TV Series
                        </NavLink>
                        <Dropdown data={SUBMENU.SERIES} />
                     </div>
                  </Navbar.Item>
                  <Navbar.Item>
                     <div className={styles.categoryLinkWrapper}>
                        <NavLink
                           to={ROUTES.PEOPLE}
                           style={{
                              color: `${isDark ? '#fafafa' : '#000000'}`,
                           }}
                           className={styles.categoryLink}
                        >
                           People
                        </NavLink>
                     </div>
                  </Navbar.Item>
                  <Navbar.Item>
                     <div className={styles.categoryLinkWrapper}>
                        <NavLink to={'https://www.themoviedb.org/'}>
                           <Text
                              css={{
                                 fontWeight: '700',
                                 letterSpacing: '2px',
                                 transition: '0.2s all linear',
                                 textGradient: isDark
                                    ? '#fafafa, #fafafa'
                                    : '$black, $black',
                                 '&:hover': {
                                    textGradient:
                                       '90deg,rgb(144, 206, 161), rgb(1, 180, 228)',
                                 },
                              }}
                           >
                              TMDB
                           </Text>
                        </NavLink>
                        <Dropdown data={SUBMENU.TMDB} />
                     </div>
                  </Navbar.Item>
               </Navbar.Content>

               <Navbar.Content>
                  <SearchInput />
                  <Switch
                     checked={isDark}
                     onChange={handleChange}
                     size="sm"
                     iconOn={<IoMoon />}
                     iconOff={<IoMdSunny />}
                  />
               </Navbar.Content>
            </Container>
            <Navbar.Content
               css={{
                  margin: '0 0.5rem',
                  oy: 'visible',
                  '@xsMax': {
                     display: 'none',
                  },
                  gap: '1rem',
               }}
            >
               <div
                  style={{
                     position: 'relative',
                  }}
               >
                  <label
                     htmlFor="genres"
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                     }}
                  >
                     <input
                        type="checkbox"
                        id="genres"
                        name="genres"
                        style={{ display: 'none' }}
                        onChange={() => setMovieGenres(prev => !prev)}
                     />
                     <div
                        style={{
                           display: 'flex',
                           position: 'relative',
                           width: '7rem',
                           justifyContent: 'center',
                           height: '2.1rem',
                        }}
                     >
                        <AnimatePresence mode="wait">
                           {movieGenres ? (
                              <motion.span
                                 key="movie"
                                 initial={
                                    isFirstRender
                                       ? false
                                       : { bottom: '-10px', opacity: 0 }
                                 }
                                 animate={{ bottom: '2px', opacity: 1 }}
                                 exit={{ scale: 0.6, opacity: 0 }}
                                 transition={{
                                    duration: 0.3,
                                    bottom: { duration: 0.2 },
                                 }}
                                 style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    padding: '0.3rem 1rem',
                                    color: '#fafafa',
                                    fontFamily: 'Roboto',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    backgroundColor: '#9210a0',
                                    textTransform: 'uppercase',
                                    borderRadius: '0.5rem',
                                 }}
                              >
                                 movie
                              </motion.span>
                           ) : (
                              <motion.span
                                 initial={{ bottom: '-10px', opacity: 0 }}
                                 animate={{ bottom: '2px', opacity: 1 }}
                                 exit={{ scale: 0.6, opacity: 0 }}
                                 transition={{
                                    duration: 0.4,
                                    bottom: { duration: 0.2 },
                                    opacity: { duration: 0.2 },
                                 }}
                                 key="tvshow"
                                 style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    padding: '0.3rem 1rem',
                                    whiteSpace: 'nowrap',
                                    color: '#fafafa',
                                    fontFamily: 'Roboto',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    backgroundColor: '#9210a0',
                                    textTransform: 'uppercase',
                                    borderRadius: '0.5rem',
                                 }}
                              >
                                 tv show
                              </motion.span>
                           )}
                        </AnimatePresence>
                     </div>
                  </label>
               </div>

               <div
                  className={styles.container_scrollbar}
                  ref={genreContainerRef}
               >
                  <AnimatePresence mode="wait">
                     {movieGenres ? (
                        <motion.div
                           key="movie_genres"
                           initial={isFirstRender ? false : { opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           {GENRES?.map(genre => (
                              <NavLink
                                 key={genre.id}
                                 to={`${ROUTES.MOVIE_GENRE}/${genre.id}`}
                                 className={({ isActive, isPending }) =>
                                    isPending
                                       ? 'pending'
                                       : isActive
                                       ? styles.active
                                       : ''
                                 }
                                 style={{ textTransform: 'uppercase' }}
                              >
                                 {genre.name}
                              </NavLink>
                           ))}
                        </motion.div>
                     ) : (
                        <motion.div
                           key="tvshow_genres"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           {SERIES_GENRES?.map(genre => (
                              <NavLink
                                 key={genre.id}
                                 to={`${ROUTES.SERIES_GENRE}/${genre.id}`}
                                 className={({ isActive, isPending }) =>
                                    isPending
                                       ? 'pending'
                                       : isActive
                                       ? styles.active
                                       : ''
                                 }
                                 style={{ textTransform: 'uppercase' }}
                              >
                                 {genre.name}
                              </NavLink>
                           ))}
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </Navbar.Content>
            <Navbar.Collapse>
               {MENU_ITEMS.map((el, i) => (
                  <Navbar.CollapseItem key={i}>
                     <Link
                        css={{ color: 'inherit', minWidth: '100%' }}
                        href={el.route}
                     >
                        {el.name}
                     </Link>
                  </Navbar.CollapseItem>
               ))}
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Nav;

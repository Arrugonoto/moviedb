import { useState } from 'react';
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

const Nav = () => {
   const { isDark } = useTheme();
   const [movieGenres, setMovieGenres] = useState<boolean>(true);

   const handleChange = () => {
      const nextTheme = isDark ? 'light' : 'dark';
      window.localStorage.setItem('data-theme', nextTheme);
      changeTheme(nextTheme);
   };

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
                     gap: '0.3rem',
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
                                 textGradient:
                                    '90deg,rgb(144, 206, 161), rgb(1, 180, 228)',
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
                           alignItems: 'center',
                           width: '4rem',
                        }}
                     >
                        {movieGenres ? (
                           <span
                              style={{
                                 display: 'flex',
                                 position: 'absolute',
                                 padding: '0.1rem',
                                 background: 'blue',
                              }}
                           >
                              movie
                           </span>
                        ) : (
                           <span
                              style={{
                                 display: 'flex',
                                 position: 'absolute',
                                 padding: '0.1rem',
                                 background: 'blue',
                                 whiteSpace: 'nowrap',
                              }}
                           >
                              tv show
                           </span>
                        )}
                     </div>
                  </label>
               </div>

               <div className={styles.container_scrollbar}>
                  {movieGenres
                     ? GENRES?.map(genre => (
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
                       ))
                     : SERIES_GENRES?.map(genre => (
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

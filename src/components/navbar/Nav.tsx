import {
   Navbar,
   Text,
   Switch,
   changeTheme,
   useTheme,
   Container,
   Image,
} from '@nextui-org/react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { GENRES } from '../../data/genres';
import { IoMoon } from 'react-icons/io5';
import { IoMdSunny } from 'react-icons/io';
import Logo from '../../assets/logo.svg';
import ROUTES from '../../routes/routes';
import Dropdown from './Dropdown';
import { MOVIES, SERIES } from '../../data/subMenu';
import SearchInput from './SearchInput';

const Nav = () => {
   const { isDark } = useTheme();

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
               <Navbar.Brand>
                  <NavLink to={ROUTES.HOME}>
                     <Image
                        width={140}
                        src={Logo}
                        alt="MovieDB - app logo"
                        style={{ cursor: 'pointer' }}
                     />
                  </NavLink>
               </Navbar.Brand>
               <Navbar.Content gap={6}>
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
                        <Dropdown data={MOVIES} />
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
                        <Dropdown data={SERIES} />
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
               gap={10}
               css={{
                  margin: '0 0.5rem',
                  oy: 'visible',
               }}
            >
               <Text
                  css={{
                     fontFamily: 'Roboto',
                     fontSize: '0.9rem',
                     letterSpacing: '0.05px',
                  }}
                  title="Genre"
               >
                  movie:
               </Text>
               <div className={styles.container_scrollbar}>
                  {GENRES?.map(
                     (genre: { id: number; name: string }): JSX.Element => (
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
                     )
                  )}
               </div>
            </Navbar.Content>
         </Container>
      </Navbar>
   );
};

export default Nav;

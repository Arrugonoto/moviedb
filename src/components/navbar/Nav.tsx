import {
   Navbar,
   Text,
   Switch,
   changeTheme,
   useTheme,
   Container,
   Input,
   Image,
} from '@nextui-org/react';
import styles from './nav.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { GENRES } from '../../data/genres';
import { IoMoon } from 'react-icons/io5';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdSunny } from 'react-icons/io';
import Logo from '../../assets/logo.svg';
import ROUTES from '../../routes/routes';

const Nav = () => {
   const { isDark } = useTheme();
   const navigate = useNavigate();

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
               <div
                  style={{
                     display: 'flex',
                     gap: '.5rem',
                     alignItems: 'center',
                  }}
               >
                  <Navbar.Brand>
                     <Image
                        width={140}
                        src={Logo}
                        alt="MovieDB - app logo"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`${ROUTES.HOME}`)}
                     />
                  </Navbar.Brand>
                  <Navbar.Content
                     gap={20}
                     css={{
                        br: '0.3rem',
                        p: '0 .5rem',
                        bc: 'rgba(40, 127, 184, 0.6)',
                     }}
                  >
                     <Navbar.Item>
                        <NavLink
                           to={''}
                           style={{
                              color: `${isDark ? '#fafafa' : '#000000'}`,
                           }}
                           className={styles.categoryLink}
                        >
                           Movies
                        </NavLink>
                     </Navbar.Item>
                     <Navbar.Item>
                        <NavLink
                           to={''}
                           style={{
                              color: `${isDark ? '#fafafa' : '#000000'}`,
                           }}
                           className={styles.categoryLink}
                        >
                           TV Series
                        </NavLink>
                     </Navbar.Item>
                     <Navbar.Item>
                        <NavLink
                           to={''}
                           style={{
                              color: `${isDark ? '#fafafa' : '#000000'}`,
                           }}
                           className={styles.categoryLink}
                        >
                           People
                        </NavLink>
                     </Navbar.Item>
                  </Navbar.Content>
               </div>

               <Navbar.Content>
                  <Input
                     type="search"
                     size="xs"
                     bordered
                     clearable
                     aria-label="Input search"
                     placeholder="Search by title/series"
                     contentLeft={
                        <HiOutlineSearch
                           style={{ width: '14px', marginLeft: '3px' }}
                        />
                     }
                     contentLeftStyling={false}
                     color="primary"
                  />
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
                  d: 'flex',
                  fd: 'row',
                  jc: 'center',
                  margin: '0 0.5rem',
               }}
            >
               <Text
                  css={{
                     fontFamily: 'Roboto',
                     fontSize: '0.9rem',
                     letterSpacing: '0.05px',
                  }}
               >
                  movie:
               </Text>
               <div className={styles.container_scrollbar}>
                  {GENRES?.map(
                     (genre: { id: number; name: string }): JSX.Element => (
                        <NavLink
                           key={genre.id}
                           to={`${ROUTES.GENRE}/${genre.id}`}
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

import {
   Navbar,
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
            css={{ fd: 'column', p: '0 0.2rem', maxWidth: '1500px' }}
         >
            <Container
               fluid
               responsive
               css={{
                  d: 'flex',
                  jc: 'space-between',
                  ai: 'center',
                  p: '0',
                  m: '0',
                  width: '100%',
                  maxWidth: '1500px',
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
            <Navbar.Content className={styles.container_scrollbar} gap={10}>
               {GENRES?.map(
                  (genre: { id: number; name: string }): JSX.Element => (
                     <NavLink
                        key={genre.id}
                        to={`${ROUTES.GENRE}/${genre.id}`}
                        className={({ isActive, isPending }) =>
                           isPending ? 'pending' : isActive ? styles.active : ''
                        }
                        style={{ textTransform: 'uppercase' }}
                     >
                        {genre.name}
                     </NavLink>
                  )
               )}
            </Navbar.Content>
         </Container>
      </Navbar>
   );
};

export default Nav;

import {
   Navbar,
   Switch,
   changeTheme,
   useTheme,
   Container,
   Input,
} from '@nextui-org/react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { GENRES } from '../../data/genres';
import { IoSearchOutline, IoMoon } from 'react-icons/io5';
import { IoMdSunny } from 'react-icons/io';

const Nav = () => {
   const { isDark } = useTheme();

   const handleChange = () => {
      const nextTheme = isDark ? 'light' : 'dark';
      window.localStorage.setItem('data-theme', nextTheme);
      changeTheme(nextTheme);
   };

   return (
      <Navbar maxWidth="fluid" css={{ py: '.4rem' }} height="auto">
         <Container fluid css={{ fd: 'column', p: '0 .2rem' }}>
            <Navbar.Content css={{ jc: 'flex-end', ai: 'center' }}>
               <Input
                  type="search"
                  size="xs"
                  bordered
                  clearable
                  aria-label="Input search"
                  placeholder="Search by title/series"
                  contentRight={<IoSearchOutline />}
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
            <Navbar.Content className={styles.container_scrollbar}>
               {GENRES.map(
                  (genre: { id: number; name: string }): JSX.Element => (
                     <NavLink
                        key={genre.id}
                        to={`/moviedb/movie/genre/${genre.id}`}
                        className={({ isActive, isPending }) =>
                           isPending ? 'pending' : isActive ? styles.active : ''
                        }
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

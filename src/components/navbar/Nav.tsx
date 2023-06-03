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

const Nav = () => {
   const { isDark } = useTheme();

   const handleChange = () => {
      const nextTheme = isDark ? 'light' : 'dark';
      window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
      changeTheme(nextTheme);
   };

   return (
      <Navbar maxWidth="fluid" css={{ py: '0.3rem' }}>
         <Container fluid css={{ fd: 'column', p: '0 .2rem' }}>
            <Navbar.Content css={{ jc: 'flex-end', ai: 'center' }}>
               <Input bordered size="sm" />
               <Switch checked={isDark} onChange={handleChange} />
            </Navbar.Content>
            <Navbar.Content
               css={{ ox: 'auto', p: '.8rem 0rem' }}
               className={styles.container_scrollbar}
            >
               {GENRES.map(
                  (genre: { id: number; name: string }): JSX.Element => (
                     <NavLink
                        key={genre.id}
                        to={`/moviedb/genre/${genre.id}`}
                        style={{ whiteSpace: 'nowrap' }}
                        className={({ isActive, isPending }) =>
                           isPending ? 'pending' : isActive ? 'active' : ''
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

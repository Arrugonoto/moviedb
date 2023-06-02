import {
   Navbar,
   Switch,
   changeTheme,
   useTheme,
   Container,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { GENRES } from '../../data/genres';

const Nav = () => {
   const { isDark } = useTheme();

   const handleChange = () => {
      const nextTheme = isDark ? 'light' : 'dark';
      window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
      changeTheme(nextTheme);
   };

   return (
      <Navbar
         maxWidth="fluid"
         css={{ display: 'flex', flexDirection: 'column' }}
      >
         <Container fluid>
            <Navbar.Content>
               <Switch checked={isDark} onChange={handleChange} />
            </Navbar.Content>
         </Container>
         <Container fluid css={{ ox: 'scroll' }}>
            <Navbar.Content>
               {GENRES.map(
                  (genre: { id: number; name: string }): JSX.Element => (
                     <Link to={`/moviedb/genre/${genre.id}`}>{genre.name}</Link>
                  )
               )}
            </Navbar.Content>
         </Container>
      </Navbar>
   );
};

export default Nav;

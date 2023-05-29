import { Switch, changeTheme, useTheme } from '@nextui-org/react';

const Navbar = () => {
   const { isDark } = useTheme();

   const handleChange = () => {
      const nextTheme = isDark ? 'light' : 'dark';
      window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
      changeTheme(nextTheme);
   };

   return (
      <nav>
         Navbar
         <Switch checked={isDark} onChange={handleChange} />
      </nav>
   );
};

export default Navbar;

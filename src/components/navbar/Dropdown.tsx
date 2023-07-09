import { Container, useTheme } from '@nextui-org/react';
import styles from './nav.module.css';
import { NavLink } from 'react-router-dom';

interface PropTypes {
   data: { name: string; route: string }[];
}

const Dropdown = ({ data }: PropTypes) => {
   const { isDark } = useTheme();

   return (
      <Container
         css={{
            d: 'none',
            position: 'absolute',
            w: 'min-content',
            h: 'min-content',
            top: '1.4rem',
            br: '0.2rem',
            p: '0',
            whiteSpace: 'nowrap',
            bc: `${isDark ? '$background' : '$background'}`,
            border: `1px solid ${
               isDark ? 'rgb(100,100,100)' : 'rgb(200,200,200)'
            }`,
         }}
         className={styles.dropdownContainer}
      >
         <ul
            style={{
               display: 'flex',
               flexDirection: 'column',
               margin: '0',
               overflow: 'hidden',
               padding: '0.5rem 0',
            }}
         >
            {data.map((el, i) => (
               <li key={i}>
                  <NavLink
                     style={{
                        color: `${isDark ? '#ffffff' : '#000000'}`,
                     }}
                     to={el.route}
                  >
                     {el.name}
                  </NavLink>
               </li>
            ))}
         </ul>
      </Container>
   );
};

export default Dropdown;

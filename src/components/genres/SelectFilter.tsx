import { ReactElement, useState, useEffect } from 'react';
import { FILTER_BY } from '../../data/filterCategory';
import style from './selectFilter.module.css';

interface PropTypes {
   setSortType: React.Dispatch<React.SetStateAction<string>>;
}

const SelectFilter = ({ setSortType }: PropTypes): ReactElement => {
   const [sortValue, setSortValue] = useState<string>('popularity.desc');

   const changeSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue: string = e.target.value;

      setSortValue(newValue);
   };

   useEffect(() => {
      setSortType(sortValue);
      // eslint-disable-next-line
   }, [sortValue]);

   return (
      <select
         className={style.selectFilter}
         aria-label="Filter movies by value"
         name="filter_movie"
         id="filter_movie"
         onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            changeSortOrder(e)
         }
      >
         {FILTER_BY.map((category, i) => (
            <option key={i} value={category.value}>
               {category.name}
            </option>
         ))}
      </select>
   );
};

export default SelectFilter;

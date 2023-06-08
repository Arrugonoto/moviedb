import { ReactElement } from 'react';
import { FILTER_BY } from '../../data/filterCategory';

interface PropTypes {
   setSortType: React.Dispatch<React.SetStateAction<string>>;
}

const SelectFilter = ({ setSortType }: PropTypes): ReactElement => {
   return (
      <select
         aria-label="Filter movies by value"
         name="filter_movie"
         id="filter_movie"
         onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortType(e.target.value)
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

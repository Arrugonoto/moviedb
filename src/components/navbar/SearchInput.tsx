import { useState, useRef } from 'react';
import { Container, Input } from '@nextui-org/react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';

const SearchInput = () => {
   const [queryValue, setQueryValue] = useState<string>('');
   const navigate = useNavigate();
   const inputRef = useRef<HTMLInputElement>(null);

   // eslint-disable-next-line
   const handleChange = (e: any) => {
      setQueryValue(e.target.value);
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const encodedQuery = encodeURIComponent(queryValue);

      if (queryValue) navigate(`/${ROUTES.SEARCH}/?q=${encodedQuery}`);

      setQueryValue('');
      inputRef?.current?.blur();
   };

   return (
      <Container css={{ m: '0', p: '0' }}>
         <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
         >
            <Input
               ref={inputRef}
               type="search"
               size="xs"
               bordered
               clearable
               aria-label="Input search"
               placeholder="Search by title or person"
               contentLeft={
                  <HiOutlineSearch
                     style={{ width: '14px', marginLeft: '3px' }}
                  />
               }
               contentLeftStyling={false}
               color="primary"
               value={queryValue}
               onChange={handleChange}
            />
         </form>
      </Container>
   );
};

export default SearchInput;

import * as React from 'react';
import RoutesConfig from '../../../../config/routesConfig';
import useDebounce from '../../../../hook/useDebounce';
import NavService from '../../../../services/Nav.service';
import { useQueryParams } from '../../common';

interface CategoryItemProps {
  label: string;
  isActive?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ label, isActive = false }) => {
  const textColor = isActive ? 'text-indigo-700' : 'text-gray-800';

  return <div className={`${textColor} cursor-pointer`}>{label}</div>;
};

const SearchWrapper: React.FC = () => {
  const categories = [
    { label: 'Semua', isActive: true },
    { label: 'UI Design' },
    { label: 'Programming' },
    { label: 'Marketing' },
    { label: 'Soft Skill' },
    { label: 'Network' },
    { label: 'Data Analyst' }
  ];

  return (
    <section className="flex flex-col w-full items-center gap-5 pb-20 md:pb-44 px-5 md:px-12 lg:px-20">
      <SearchInput placeholder="Cari Kursus . . ." />
      <div className="flex gap-10 px-5 flex-wrap text-base md:text-lg font-medium leading-8 md:flex-wrap md:mt-10">
        {categories.map((category) => (
          <CategoryItem key={category.label} label={category.label} isActive={category.isActive} />
        ))}
      </div>
    </section>
  );
};
interface SearchInputProps {
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  const [search, setSearch] = React.useState('');
  const query = useQueryParams();
  const nav = new NavService();
  const searchDebounce = useDebounce(search, 500);
  React.useEffect(() => {
    nav.redirectUser(RoutesConfig.HomePage.path({ ...query, title: searchDebounce }));
  }, [searchDebounce]);
  return (
    <div
      className="justify-center items-start self-center px-12 py-6 max-w-full text-xl tracking-normal leading-8 text-gray-800 rounded-lg border-2 border-solid border-gray-800 border-opacity-60  max-md:px-5"
      style={{ width: '746px' }}
    >
      <label htmlFor="search" className="sr-only">
        {placeholder}
      </label>
      <input
        autoComplete="off"
        type="search"
        id="search"
        className="w-full bg-transparent outline-none"
        placeholder={placeholder}
        aria-label={placeholder}
        value={search ?? ''}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchWrapper;

import { MdSearch } from 'react-icons/md';

const Search = () => (
  <div className="dark:bg-dark-gray dark:text-light-gray hover:bg-primary hover:text-white dark:hover:bg-primary transition duration-300 bg-white text-primary rounded-md mb-4 flex items-stretch">
    <input
      type="text"
      className="bg-transparent h-12 w-full outline-none p-3"
      placeholder="Search..."
    />
    <button className="w-16 flex justify-center items-center text-2xl">
      <MdSearch />
    </button>
  </div>
);

export default Search;

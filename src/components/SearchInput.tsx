import { FunctionComponent } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: FunctionComponent<SearchInputProps> = ({ onSearch }) => {
  return (
    <input
      type="search"
      className="form-control mb-3"
      placeholder="Search"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchInput;

import { BsSearch } from 'react-icons/bs';
import {
  SearchbarWrap,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => (
  <SearchbarWrap>
    <SearchForm onSubmit={onSubmit}>
      <SearchFormButton type="submit">
        <BsSearch size="24" />
      </SearchFormButton>

      <SearchFormInput
        name="search"
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </SearchForm>
  </SearchbarWrap>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

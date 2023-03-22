import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

export default function Searchbar({ onSubmited }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setValue(value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value === '') return;
    // *  Відправка значення value як string в state App
    onSubmited(value);
  };

  const {
    Searchbar,
    SearchForm,
    SearchForm_button,
    SearchForm_button_label,
    SearchForm_input,
  } = css;

  return (
    <header className={Searchbar}>
      <form className={SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={SearchForm_button}>
          <MdSearch width="40" height="40" />
          <span className={SearchForm_button_label}>Search</span>
        </button>

        <input
          className={SearchForm_input}
          type="text"
          name="searchName"
          onChange={handleChange}
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmited: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/searchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { searchInput: '' };
  }

  handleSearchInput(event) {
    const { target: { value } } = event;
    this.setState({ searchInput: value });
  }

  render() {
    const { searchInput } = this.state;

    return (
      <div className="searchbar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          data-testid="input-search"
          onChange={(event) => this.handleSearchInput(event)}
        />
        <div className="search-btn">
          <Link
            data-testid="search-button"
            className="material-icons search-icon"
            to={`/results/${searchInput}`}
          >
            search
          </Link>
        </div>
      </div>
    );
  }
}

export default SearchBar;

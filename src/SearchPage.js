import React, { Component } from "react";
import SearchResult from "./SearchResult";

class SearchShow extends Component {
  state = {
    searchInput: "Mr robot"
  };

  render() {
    const { searchInput } = this.state;

    return (
      <div>
        <input
          defaultValue="Mr robot"
          value={this.state.search}
          placeholder="Your favorite show name"
          onChange={e => this.setState({ searchInput: e.target.value })}
        />
        <button onClick={e => this.setState({ launchSearch: true })}>
          Search
        </button>

        {searchInput !== "" && <SearchResult searchInput={searchInput} />}
      </div>
    );
  }
}

export default SearchShow;

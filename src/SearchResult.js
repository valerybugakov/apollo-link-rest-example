import React, { Component } from "react";
import { graphql } from "react-apollo";
import Season from "./Season";
import { showsQuery } from "./api/queries";

class ShowsResult extends Component {
  render() {
    const { data: { loading, error, show } } = this.props;

    if (loading) {
      return <h4>Loading...</h4>;
    }
    if (error) {
      return <h4>{error.message}</h4>;
    }

    return (
      <div>
        <h1>{show.name}</h1>

        {show.seasons.map(({ number, image, summary }) => (
          <Season
            key={number}
            number={number}
            image={image}
            summary={summary}
          />
        ))}
      </div>
    );
  }
}

export default graphql(showsQuery, {
  options: ({ searchInput }) => ({ variables: { searchInput } })
})(ShowsResult);

import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Season from "./Season";
import client from "./networkClient";

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

const showsQuery = gql`
  query shows($searchInput: String!) {
    show(search: $searchInput)
      @rest(type: "Show", path: "singlesearch/shows?q=:search") {
      id @export(as: "showId")
      name
      seasons @rest(type: "Season", path: "shows/:showId/seasons") {
        number
        image
        summary
      }
    }
  }
`;

// imperative query
setTimeout(() => {
  client
    .query({
      query: showsQuery,
      variables: {
        searchInput: "wow"
      }
    })
    .then(params => {
      console.log(params.data.show.name);
    });
}, 2000);

// declarative container query
export default graphql(showsQuery, {
  options: ({ searchInput }) => ({ variables: { searchInput } })
})(ShowsResult);

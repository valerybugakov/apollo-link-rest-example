import gql from "graphql-tag";

export const showsQuery = gql`
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

export const postMutation = gql`
  fragment Show on REST {
    id: ID
    name: String
  }

  mutation updateShow($input: Show!) {
    show(input: $input)
      @rest(type: "Show", path: "", method: "POST", endpoint: "demo") {
      id
      name
    }
  }
`;

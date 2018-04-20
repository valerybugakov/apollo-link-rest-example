import client from "./networkClient";
import { postMutation, showsQuery } from "./queries";

// test imperative queries and mutations
setTimeout(() => {
  client
    .mutate({
      mutation: postMutation,
      variables: { input: { id: 1871, name: "Hello world!" } }
    })
    .then(res => {
      console.log(res.data.user);
      console.log(client.cache.data.data);
    });

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

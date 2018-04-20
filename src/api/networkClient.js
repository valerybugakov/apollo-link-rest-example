import Observable from "zen-observable";
import { ApolloLink } from "apollo-link";
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from "apollo-client";
import { ReduxCache, apolloReducer } from "apollo-cache-redux";
// import { InMemoryCache } from "apollo-cache-inmemory";
import { compose, createStore, combineReducers } from "redux";
import gql from "graphql-tag";

const coolCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createEnhanced = coolCompose()(createStore);

const store = createEnhanced(
  combineReducers({
    apollo: apolloReducer
  })
);

const requestStatusLink = new ApolloLink((operation, next) => {
  console.log(operation.operationName, "request start");

  return new Observable(observer =>
    next(operation).subscribe({
      next: resp => {
        console.log(operation.operationName, "request success", resp);
        return observer.next(resp);
      },
      error: error => {
        console.log(operation.operationName, "request fail", error);
      },
      complete: resp => observer.complete(resp)
    })
  );
});

const restLink = new RestLink({
  uri: "https://api.tvmaze.com/",
  endpoints: {
    demo: "https://demo4931428.mockable.io"
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([requestStatusLink, restLink]),
  cache: new ReduxCache({ store })
  // cache: new InMemoryCache()
});

export default client;

import Observable from "zen-observable";
import { ApolloLink } from "apollo-link";
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from "apollo-client";
import { ReduxCache, apolloReducer } from "apollo-cache-redux";
import { compose, createStore, combineReducers } from "redux";

const coolCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createEnhanced = coolCompose()(createStore);

const store = createEnhanced(
  combineReducers({
    apollo: apolloReducer
  })
);

const reduxLink = new ApolloLink((operation, next) => {
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
  uri: "https://api.tvmaze.com/"
});

export default new ApolloClient({
  link: ApolloLink.from([reduxLink, restLink]),
  cache: new ReduxCache({ store })
});

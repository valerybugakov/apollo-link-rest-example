import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import client from "./api/networkClient";
import "./api/imperative";
import SearchPage from "./SearchPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Apollo Rest Link Example</h1>
        </header>
        <SearchPage />
      </div>
    );
  }
}

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ApolloApp;

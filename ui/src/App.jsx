import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import css from './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

// import components
import Page from './Page.jsx';

import Auth0ProviderWithHistory from './auth0Provider';


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ url: process.env.UI_API_ENDPOINT }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const element = (
  <Auth0ProviderWithHistory>
    <ApolloProvider client={client}>
      <Router>
        <Page />
      </Router>
    </ApolloProvider>
  </Auth0ProviderWithHistory>
);

ReactDOM.render(element, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

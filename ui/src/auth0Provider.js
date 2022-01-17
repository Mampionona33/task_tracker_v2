import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState) => {
    return <useNavigate to={appState?.returnTo || window.location.pathname} />;
  };
  // const onRedirectCallback = (appState) => {
  //   history.push(appState?.returnTo || window.location.pathname);
  // };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      // useRefreshTokens={true}
      // cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

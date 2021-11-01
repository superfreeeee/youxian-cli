import React, { FC } from 'react';
import classNames from 'classnames';
import styled, { createGlobalStyle } from 'styled-components';

const AppRoot = styled.div``;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

const App: FC = () => {
  return (
    <AppRoot>
      <GlobalStyle />
      <h1>Application Front-end</h1>
    </AppRoot>
  );
};

export default App;

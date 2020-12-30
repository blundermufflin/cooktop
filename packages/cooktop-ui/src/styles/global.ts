import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #1a2640;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button{
    font-family: 'Lato', serif;
    font-size: 16px;
  }
  h1,h2,h3,h4,h5,h6,strong{
    font-weight: 500;
  }
  button{
    cursor: pointer;
  }
  html, body, .app-root {
    height: 100%;
  }
`;

import { createGlobalStyle } from 'styled-components'
import {normalize} from 'styled-normalize';


export const GlobalStyle = createGlobalStyle`
  ${normalize}
  *{
    box-sizing: border-box;
  }
  :focus,
  :active {
    outline: none;
  }
  a:focus,
  a:active {
    outline: none;
  }
  a,
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background: #FFFFFF;
  }
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 100ms ease-in-out;

  }

  .ReactModal__Overlay--after-open{
    opacity: 1;
  }

  .ReactModal__Overlay--before-close{
    opacity: 0;
  }

`


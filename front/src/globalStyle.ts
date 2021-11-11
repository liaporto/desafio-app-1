import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root{
    --primary: #1C313D;
    --secondary: #AA2C2C;
    
    --light-gray: #d5d5d5;
    --mid-gray: #AFAFAF;
    --dark-gray: #656565;

    --off-white: #F4F4F4;
    --white: #ffffff;
  }

  *,
  *::before,
  *::after{
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    background-color: var(--off-white);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1, h2{
    color: var(--primary);
  }
  
  h1{
    font-size: 2.5em;
    margin-bottom: 2em;
  }
  
  h2{
    font-size: 1.5em;
    font-weight: 400;
    margin-bottom: 1em;
  }

  .main{
    width: 40%;
    margin: 10vh auto 0;
    text-align: center;
  }
`
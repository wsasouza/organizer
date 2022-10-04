import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --toastify-color-light: linear-gradient(90deg, #f1f1f1 0%, #f4e8d2 100%);
    --toastify-color-dark: linear-gradient(90deg, #f1f1f1 0%, #f4e8d2 100%);
    --toastify-color-info: linear-gradient(90deg, #f7a407 0%, #f2cb81 100%);
    --toastify-color-error: linear-gradient(90deg, #f7a407 0%, #f2cb81 100%);
    --toastify-color-warning: linear-gradient(90deg, #f7a407 0%, #f2cb81 100%);
    --toastify-color-success: linear-gradient(90deg, #f7a407 0%, #f2cb81 100%);
    --toastify-icon-color-info: #7DBEF2;
    --toastify-icon-color-error: #F75A68;
    --toastify-icon-color-warning: #f7a407;
    --toastify-icon-color-success: #319E40;  
  
    --toastify-text-color-light: #070500;
    --toastify-text-color-dark: #070500;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    display: none;
}

  body {
    background-color: ${(props) => props.theme['gray-100']};
    color: ${(props) => props.theme['gray-800']};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
  }

  body, input-security, textarea, button {
    font: 400 1rem 'Nunito Sans', sans-serif;
  }

  a {
    text-decoration: none;
  }

  .Toastify__close-button {
    color: ${(props) => props.theme['gray-900']};
  }
`

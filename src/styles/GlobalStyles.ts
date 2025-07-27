import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --border-color: #e5e7eb;
    --card-bg: #ffffff;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    --card-hover: #f9fafb;
    --accent-color: #10b981;
    --accent-hover: #059669;
    --gradient-primary: linear-gradient(135deg, #f8fffe 0%, #f0fdf4 100%);
    --gradient-secondary: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
  }
`; 
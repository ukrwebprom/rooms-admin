import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { PropertyProvider } from './context/PropertyContext.jsx';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PropertyProvider>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
      </ThemeProvider>
      </PropertyProvider>
    </AuthProvider>
  </StrictMode>,
);

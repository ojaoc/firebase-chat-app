import '../styles/globals.css';
import '@fontsource/roboto';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: { primary: '#FFF', secondary: '#FAFAFA', disabled: '#FAFAFA' },
    background: { default: '#113047', paper: '#1D527A' },
    primary: {
      main: '#3C74F0',
    },
    secondary: {
      main: '#E3AB44',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;

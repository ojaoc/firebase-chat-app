import '../styles/globals.css';
import '@fontsource/roboto';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;

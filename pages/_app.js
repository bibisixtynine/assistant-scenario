import './styles.css';
import Head from 'next/head';

// viewport meta tag must be in _app.js (https://nextjs.org/docs/messages/no-document-viewport-meta)

function App({ Component, pageProps }) {
  <Head>
    <meta
      name="viewport"
      content="viewport-fit=cover,user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
    />
  </Head>
  return <Component {...pageProps} />
}
export default App;

import './styles.css';
import Head from 'next/head';

function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta property="og:title" content="Générateur IA de scenario" key="title" />
        <meta property="og:description" content="construit avec passion" key="description" />
        <meta
          property="og:image"
          content="https://upload.wikimedia.org/wikipedia/commons/f/f1/CoffeeMath.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <link
          id="favicon"
          rel="icon"
          href="https://cdn.glitch.com/fd9e84f4-4370-493a-847e-22cebb631384%2Fbabyduck.webp?v=1628793057158"
          type="image/x-icon"
        />
        <meta
          name="viewport"
          content="viewport-fit=cover,user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/*<meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />*/}
        <link
          rel="apple-touch-icon"
          href="https://cdn.glitch.com/fd9e84f4-4370-493a-847e-22cebb631384%2Fbabyduck.webp?v=1628793057158"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )

}

export default App;


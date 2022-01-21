import Head from "next/head";

import Sidebar from "components/layout/sidebar";

import "assets/scss/now-ui-dashboard.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Head>
        <meta
          name="description"
          content="The home of the GalactaGraph Boilerplate Example"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

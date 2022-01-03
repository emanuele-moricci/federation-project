import Sidebar from "components/layout/sidebar";

import "assets/scss/now-ui-dashboard.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Sidebar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

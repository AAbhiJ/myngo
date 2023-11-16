import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css"
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof window !== "undefined" &&
      require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

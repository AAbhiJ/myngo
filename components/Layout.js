import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "./admin/Sidebar";
import SuperSidebar from "./superadmin/Sidebar";

const Layout = ({ children }) => {
  const route = useRouter();
  const isadmin = route.pathname.includes("admin") ? true : false;
  const issuperadmin = route.pathname.includes("/superadmin") ? true : false;

  const islogin = route.pathname == "/login" ? true : false;
  return isadmin ? (
    <>
      <div className="wrapper d-flex">
        {issuperadmin ? <SuperSidebar /> : <Sidebar />}
        {children}
      </div>
    </>
  ) : (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href="assets/images/logo.png"
          type="image/x-icon"
        />
        <title>Fortunate Folks</title>
      </Head>

      <header>
        <Header />
      </header>
      <div className="pt-5 mt-5">{children}</div>
      {islogin ? (
        ""
      ) : (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
};

export default Layout;

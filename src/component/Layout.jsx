import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";

const Layout = ({ children, loading }) => {
  return (
    <>
      <Header />
      {loading && <Loader />}
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

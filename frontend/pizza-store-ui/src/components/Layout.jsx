import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout({ cartCount, handleLogout, search, setSearch }) {
  return (
    <>
      <Navbar
        cartCount={cartCount}
        handleLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />

      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
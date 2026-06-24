import Navbar from "./Navbar";
function Layout({ color, children }) {
  return (
    <>
      <div className={`fixed inset-0 -z-10 ${color}`}  />
      <Navbar />
      <main className="relative z-10">{children}</main>
    </>
  );
}

export default Layout;

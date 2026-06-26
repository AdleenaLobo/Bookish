import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import { Search } from 'lucide-react';
import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-black/50 backdrop-blur-md px-4 py-4 md:px-8 border-none">
      {/* // <nav className="fixed top-0 left-0 right-0 z-50 bg-red-500"> */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <div
          className="text-center md:text-left cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="text-xl font-bold text-amber-900 sm:text-2xl ">
            The Asiatic Society
          </h1>
        </div>

        {/* Search */}
        <div className="w-full md:w-1/3 ">
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center gap-4 md:justify-end md:gap-6">
          <a
            href="/bookstore"
            className="text-sm font-medium text-white sm:text-base hover:underline hover:underline-offset-4 hover:decoration-amber-900"
          >
            Bookstore
          </a>
          <button
            onClick={() => navigate("/history")}
            className="text-sm font-medium text-white sm:text-base hover:underline hover:underline-offset-4 hover:decoration-amber-900"
          >
            History
          </button>

          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
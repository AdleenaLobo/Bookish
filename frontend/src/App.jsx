import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookStore from "./pages/BookStore";
import Book from "./pages/Book";
// import Catalog from "./pages/Catalog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/catalog" element={<Catalog />} /> */}

      <Route path="/bookstore" element={<BookStore />} />
      <Route path="/book" element={<Book/>}/>
    </Routes>
  );
}

export default App;

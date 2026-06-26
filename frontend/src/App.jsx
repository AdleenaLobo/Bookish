import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookStore from "./pages/BookStore";
import Book from "./pages/Book";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/catalog" element={<Catalog />} /> */}

      <Route path="/bookstore" element={<BookStore />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/history" element={<History/>}/>
    </Routes>
  );
}

export default App;

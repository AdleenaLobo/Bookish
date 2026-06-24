import { useState } from "react";
import BookGrid from "../components/BookGrid";
import Layout from "../components/Layout";

const GENRES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Biography",
];

function BookStore() {
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <Layout color="bg-gradient-to-b from-amber-950 via-stone-950 to-black">
     
      {/* Genre pills */}
      <div className="flex gap-2 flex-wrap justify-center px-6 pb-6 mt-20">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
              activeGenre === genre
                ? "bg-amber-700/80 text-amber-50"
                : "text-white border border-white hover:text-amber-500"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="px-6 py-4">
        <BookGrid search={search} genre={activeGenre} />
      </div>
    </Layout>
  );
}

export default BookStore;

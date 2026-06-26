import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../services/bookservice";

function BookGrid({ search = "", genre = "All" }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filtered = books.filter((book) => {
    const matchesSearch =
      book.name?.toLowerCase().includes(search.toLowerCase()) ||
      book.author_name?.toLowerCase().includes(search.toLowerCase());

    const matchesGenre = genre === "All" || book.genre === genre;

    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-white/60">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
      {filtered.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

function BookCard({ book }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/book/${book.id}`)}
      className="
        self-start
        rounded-2xl
        overflow-hidden
        bg-white/10
        backdrop-blur-sm
        border border-white/20
        shadow-xl
        relative
        cursor-pointer
        transition-all
        duration-300
        ease-out
        hover:scale-105
        hover:-translate-y-2
        hover:shadow-2xl
        hover:border-amber-400/40
      "
    >
      {/* Book Image */}
      <div className="h-72 overflow-hidden">
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 pb-4 space-y-2">
        {/* Title + Availability */}
        <div className="flex justify-between items-start mt-3 gap-2">
          <h3 className="text-base font-semibold text-white leading-snug">
            {book.name}
          </h3>

          {book.status ? (
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 border border-green-400 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-green-400 font-medium">
                Available
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 border border-red-400 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <span className="text-xs text-red-400 font-medium">Leased</span>
            </div>
          )}
        </div>

        {/* Author */}
        <p className="text-xs text-amber-400/80 font-medium">
          {book.author_name}
        </p>
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => {
              const full = s <= Math.floor(book.stars);
              const partial = !full && s === Math.ceil(book.stars);
              const fillPercent = partial ? (book.stars % 1) * 100 : 0;

              return (
                <svg
                  key={s}
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id={`star-fill-${book.id}-${s}`}
                      x1="0"
                      x2="1"
                      y1="0"
                      y2="0"
                    >
                      <stop offset={`${fillPercent}%`} stopColor="#fbbf24" />
                      <stop
                        offset={`${fillPercent}%`}
                        stopColor="rgba(255,255,255,0.15)"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    fill={
                      full
                        ? "#fbbf24"
                        : partial
                          ? `url(#star-fill-${book.id}-${s})`
                          : "rgba(255,255,255,0.15)"
                    }
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              );
            })}
          </div>

          <span className="text-xs text-white/60">
            {Number(book.stars).toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">Lease Price</span>

          <span className="text-sm font-semibold text-amber-400">
            ₹{book.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-white/50 leading-relaxed line-clamp-3">
          {book.description}
        </p>
      </div>
    </div>
  );
}

export default BookGrid;

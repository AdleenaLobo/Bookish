import { Navigate, useNavigate } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "A proven framework for improving every day by getting 1% better each day.",
    stars: 3.5,
    genre: "Non-Fiction",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0735211299.01.L.jpg",
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    description:
      "Rules for focused success in a distracted world and achieving peak productivity.",
    stars: 4.6,
    genre: "Non-Fiction",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/1455586692.01.L.jpg",
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship for writing readable, maintainable code.",
    stars: 4.5,
    genre: "Sci-Fi",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0132350882.01.L.jpg",
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    description:
      "Your journey to mastery — timeless lessons on software development excellence.",
    stars: 4.7,
    genre: "Sci-Fi",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0135957052.01.L.jpg",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "A proven framework for improving every day by getting 1% better each day.",
    stars: 4.8,
    genre: "Fiction",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0735211299.01.L.jpg",
  },
  {
    id: 6,
    title: "Deep Work",
    author: "Cal Newport",
    description:
      "Rules for focused success in a distracted world and achieving peak productivity.",
    stars: 4.6,
    genre: "Mystery",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/1455586692.01.L.jpg",
  },
  {
    id: 7,
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship for writing readable, maintainable code.",
    stars: 4.5,
    genre: "Fantasy",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0132350882.01.L.jpg",
  },
  {
    id: 8,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    description:
      "Your journey to mastery — timeless lessons on software development excellence.",
    stars: 4.7,
    genre: "Romance",
    image:
      "https://images-na.ssl-images-amazon.com/images/P/0135957052.01.L.jpg",
  },
];

const COLUMN_OFFSETS = ["mt-0", "mt-12", "mt-0", "mt-12"];
function BookGrid({ search = "", genre = "All" }) {
  const filtered = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "All" || book.genre === genre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
      {filtered.map((book, index) => (
        <BookCard
          key={`${book.id}-${index}`}
          book={book}
        />
      ))}
    </div>
  );
}
function BookCard({ book, offsetClass }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/book")}
      className={`
        ${offsetClass}
        self-start
        rounded-2xl
        overflow-hidden
        bg-white/10
        backdrop-blur-sm
        border border-white/20
        shadow-xl
        relative
    transition-all
    duration-300
    ease-out
    hover:scale-105
    hover:-translate-y-2
    hover:shadow-2xl
    hover:border-amber-400/40

      `}
    >
      {/* Available badge — top right */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 border-2 border-green-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        <span className="text-xs text-green-400 font-medium ">Available</span>
      </div>
      <div className="h-72 overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 pb-4 space-y-1.5">
        {/* Title */}
        <h3 className="text-base font-semibold text-white leading-snug">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-xs text-amber-400/80 font-medium">{book.author}</p>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => {
              const full = s <= Math.floor(book.stars);
              const partial = !full && s === Math.ceil(book.stars);
              const fillPercent = partial ? (book.stars % 1) * 100 : 0;

              return (
                <svg
                  key={s}
                  className="w-3.5 h-3.5"
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
                        stopColor="rgba(255,255,255,0.2)"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    fill={
                      full
                        ? "#fbbf24"
                        : partial
                          ? `url(#star-fill-${book.id}-${s})`
                          : "rgba(255,255,255,0.2)"
                    }
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              );
            })}
          </div>
          <span className="text-xs text-white/50">{book.stars}</span>
        </div>
        {/* Description */}
        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
          {book.description}
        </p>
      </div>
    </div>
  );
}
export default BookGrid;

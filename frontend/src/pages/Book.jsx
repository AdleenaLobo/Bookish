import ReviewSection from "../components/ReviewSection";
import Layout from "../components/Layout";

export default function Book() {
  const book = {
    title: "The Great Gatsby",
    image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
    description:
      "A classic novel exploring wealth, love, and the American Dream.",

    author: {
      name: "F. Scott Fitzgerald",
      image:
        "https://www.loa.org/wp-content/uploads/2023/08/fitzgerald_f_scott_WD-1.jpg",

      aboutMe:
        "I am an American novelist fascinated by ambition, love, wealth, and the pursuit of dreams. Through my stories I explore the complexities of human nature and the society around us.",

      aboutBook:
        "The Great Gatsby was born from my observations of the Jazz Age. I wanted to capture the glamour, excess, and hidden loneliness that existed beneath the surface of wealth and status.",

      quote:
        "I wanted readers to experience the glamour, ambition and loneliness hidden beneath the American Dream.",
    },

    stars: 4.6,

    reviews: [
      {
        user: "John",
        comment: "Amazing storytelling and symbolism.",
      },
      {
        user: "Sarah",
        comment: "One of the best classics ever written.",
      },
    ],
  };

  return (
    <Layout color={"bg-black"}>
      <div className="min-h-screen bg-gradient-to-b from-[#4a2508] via-[#140a02] to-black">
        <div className="max-w-7xl mx-auto px-6 py-16 mt-5">
          {/* MAIN SECTION */}

          <div className="grid lg:grid-cols-[1.2fr_auto_1fr] gap-10 p-10">
            {/* BOOK SECTION */}
            <div className="grid md:grid-cols-[300px_1fr] gap-12">
              {/* Cover */}

              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-5 bg-amber-500/10 blur-3xl rounded-full" />

                  {/* Availability Badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-green-500/30">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-green-400 font-semibold">
                        Available
                      </span>
                    </div>
                  </div>

                  <img
                    src={book.image}
                    alt={book.title}
                    className="
      relative
      w-72
      rounded-2xl
      border
      border-amber-500/20
      shadow-[0_0_40px_rgba(251,191,36,0.15)]
      hover:scale-105
      transition-all
      duration-300
    "
                  />
                </div>
                <div className="mt-8">
                  <button
                    className="
                    w-full
                        px-8
                        py-3
                        rounded-xl
                        bg-amber-500
                        hover:bg-amber-400
                        text-black
                        font-semibold
                        transition-all
                        duration-300
                        shadow-lg
                        hover:shadow-amber-500/40
                      "
                  >
                    Lease Book
                  </button>

                  <p className="mt-3 text-sm text-white/60 max-w-lg">
                    Books must be returned within{" "}
                    <span className="text-amber-400 font-semibold">
                      30 days
                    </span>
                    . Late returns may incur library penalties.
                  </p>
                </div>
              </div>

              {/* Book Details */}

              <div className="flex-1">
                <h1 className="text-5xl font-bold text-white leading-tight">
                  {book.title}
                </h1>

                <div className="w-24 h-1 bg-amber-400 rounded-full mt-4" />

                <p className="mt-6 text-white/70 leading-relaxed text-lg">
                  {book.description}
                </p>

                {/* Stats */}
{/* 
                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-white/50">Rating</p>
                    <p className="text-amber-400 font-semibold text-lg">
                      {book.stars} ★
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-white/50">Availability</p>
                    <p className="text-green-400 font-semibold">Available</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-white/50">Lease Period</p>
                    <p className="text-white font-semibold">30 Days</p>
                  </div>
                </div> */}

                {/* Lease */}
              </div>
            </div>

            {/* VERTICAL DIVIDER */}

            <div className="hidden lg:flex justify-center">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
            </div>

            {/* AUTHOR SECTION */}

            <div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={book.author.image}
                  alt={book.author.name}
                  className="
                      w-36
                      h-36
                      rounded-full
                      object-cover
                      border-4
                      border-amber-400
                      shadow-[0_0_30px_rgba(251,191,36,0.25)]
                    "
                />

                <h2 className="mt-5 text-3xl font-bold text-white">
                  {book.author.name}
                </h2>

                <div className="w-20 h-1 bg-amber-400 rounded-full mt-3" />
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-amber-400 font-semibold mb-3">
                    About Me
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {book.author.aboutMe}
                  </p>
                </div>

                <div>
                  <h3 className="text-amber-400 font-semibold mb-3">
                    About This Book
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {book.author.aboutBook}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-amber-400 text-sm font-medium mb-2">
                    Author's Note
                  </p>

                  <p className="italic text-white/70 leading-relaxed">
                    "{book.author.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS */}

          <div className="mt-12">
            <ReviewSection stars={book.stars} reviews={book.reviews} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

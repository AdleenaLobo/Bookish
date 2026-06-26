import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import ReviewSection from "../components/ReviewSection";

import { fetchBook } from "../services/bookservice.js";
import { fetchAuthor } from "../services/authorservice";
import { toast } from "react-toastify";
import { leaseBook } from "../services/historyservice";

export default function Book() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      const bookData = await fetchBook(id);

      setBook(bookData);

      const authorData = await fetchAuthor(bookData.author_id);

      setAuthor(authorData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout color="bg-black">
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-white">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout color="bg-black">
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-white">Book not found</p>
        </div>
      </Layout>
    );
  }

  const handleLease = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("Please login first.");
        return;
      }

      await leaseBook({
        user_id: user.id,
        book_id: book.id,
      });

      toast.success("Book leased successfully!");

      setBook({
        ...book,
        status: false,
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to lease book.");
    }
  };

  return (
    <Layout color={"bg-black"}>
      <div className="min-h-screen bg-gradient-to-b from-[#4a2508] via-[#140a02] to-black">
        <div className="max-w-7xl mx-auto px-6 py-16 mt-5">
          <div className="grid lg:grid-cols-[1.2fr_auto_1fr] gap-10 p-10">
            {/* BOOK */}

            <div className="grid md:grid-cols-[300px_1fr] gap-12">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-5 bg-amber-500/10 blur-3xl rounded-full" />

                  <div className="absolute top-3 right-3 z-20">
                    {book.status ? (
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-green-500/30">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400 font-semibold">
                          Available
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-red-500/30">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-xs text-red-400 font-semibold">
                          Leased
                        </span>
                      </div>
                    )}
                  </div>

                  <img
                    src={book.image}
                    alt={book.name}
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
                <div className="mt-8 w-full space-y-5">
                  {/* Price Card */}
                  {/* <div className=" p-5 text-center ">
                    <p className="text-sm uppercase tracking-[0.25em] text-white/50">
                      Lease Price
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-amber-400">
                      ₹{book.price}
                    </h2>
                  </div> */}

                  {/* Lease Button */}
                  <button
                    onClick={handleLease}
                    disabled={!book.status}
                    className="
      w-full
      py-4
      rounded-xl
      bg-amber-500
      hover:bg-amber-400
      disabled:bg-gray-600
      disabled:cursor-not-allowed
      text-black
      font-semibold
      text-lg
      transition-all
      duration-300
      shadow-lg
      hover:shadow-amber-500/40
    "
                  >
                    {book.status ? "Lease Book" : "Already Leased"}
                  </button>

                </div>{" "}
              </div>

              {/* DETAILS */}

              <div>
                <h1 className="text-5xl font-bold text-white">{book.name}</h1>

                <div className="w-24 h-1 bg-amber-400 rounded-full mt-4" />

                <p className="mt-6 text-white/70 leading-relaxed text-lg">
                  {book.description}
                </p>

                <div className="mt-8 flex justify-around">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-white/50">Rating</p>
                    <p className="text-amber-400 font-semibold text-lg">
                      {book.stars}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 pl-2">
                    <p className="text-xs text-white/50">Availability</p>

                    <p
                      className={` ${
                        book.status ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {book.status ? "Available" : "Leased"}
                    </p>
                  </div>

                </div>

                {book.author_book_description && (
                  <div className="mt-10">
                    <h3 className="text-amber-400 font-semibold mb-3">
                      About This Book
                    </h3>

                    <p className="text-white/70 leading-relaxed">
                      {book.author_book_description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* DIVIDER */}

            <div className="hidden lg:flex justify-center">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-amber-400/60 to-transparent" />
            </div>

            {/* AUTHOR */}

            {author && (
              <div>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="
                    w-36
                    h-36
                    rounded-full
                    object-cover
                    border-4
                    border-amber-400
                  "
                  />

                  <h2 className="mt-5 text-3xl font-bold text-white">
                    {author.name}
                  </h2>

                  <div className="w-20 h-1 bg-amber-400 rounded-full mt-3" />
                </div>

                <div className="mt-8">
                  <h3 className="text-amber-400 font-semibold mb-3">
                    About Author
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {author.description}
                  </p>
                </div>
                <div className="mt-8">
                  <h3 className="text-amber-400 font-semibold mb-3">
                    About Book
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {book.author_book_description}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12">
            <ReviewSection stars={book.stars || 0} reviews={[]} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

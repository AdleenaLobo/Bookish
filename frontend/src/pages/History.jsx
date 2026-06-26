import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchHistory } from "../services/historyservice";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setLoading(false);
      return;
    }

    loadHistory(user.id);
  }, []);

  const loadHistory = async (userId) => {
    try {
      const data = await fetchHistory(userId);
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout color="bg-black">
        <div className="min-h-screen flex justify-center items-center text-white">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout color="bg-gradient-to-b from-amber-950 via-stone-950 to-black">
      <div className="min-h-screen px-6 py-20 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Lease History</h1>

        <p className="text-white/50 mb-12">
          Books you've leased from the library.
        </p>

        {history.length === 0 ? (
          <div className="text-white/50 text-lg">No books leased yet.</div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <img
                  src={item.book.image}
                  alt={item.book.name}
                  className="w-24 h-36 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white">
                    {item.book.name}
                  </h2>

                  <p className="text-amber-400">{item.book.author_name}</p>

                  <p className="text-white/50 mt-4">
                    Leased: {new Date(item.leased_at).toLocaleDateString()}
                  </p>

                  <p className="text-white/50">
                    Due: {new Date(item.due_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center">
                  {item.returned ? (
                    <span className="text-green-400 font-semibold">
                      Returned
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold">
                      Active Lease
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

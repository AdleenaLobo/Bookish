import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authservice";

export default function Login() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await login({
      email: formData.email,
      password: formData.password,
    });

localStorage.setItem("user", JSON.stringify(response.user));
    navigate("/");
  } catch (err) {
    alert(err.message);
  }
};

return ( <div className="min-h-screen bg-black flex items-center justify-center px-6"> <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden">
{/* Left Side */} <div className="hidden lg:flex flex-col justify-center p-12 border-r border-amber-500/10"> <h1 className="text-5xl font-bold text-white">Bookish</h1>

```
      <div className="w-24 h-1 bg-amber-400 rounded-full mt-6" />

      <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-md">
        Discover books, lease titles, track returns, and explore authors
        from around the world in one place.
      </p>
    </div>

    {/* Right Side */}
    <div className="flex items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-400/70 text-center">
            Bookish
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-white text-center">
            Login
          </h2>

          <p className="text-center text-white/50 mt-2">
            Access your library account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white/70 mb-2">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-white/70 mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-amber-400 hover:text-amber-300"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            New to Bookish?{" "}
            <Link
              to="/signup"
              className="text-amber-400 hover:text-amber-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

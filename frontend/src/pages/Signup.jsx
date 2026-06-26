import { Link } from "react-router-dom";
import { signup } from "../services/authservice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phoneNo: "",
  password: "",
  confirmPassword: "",
});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await signup({
      name: formData.fullName,
      email: formData.email,
      phone_no: formData.phoneNo,
      password: formData.password,
    });

    navigate("/login");
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 border-r border-amber-500/10">
          <h1 className="text-5xl font-bold text-white">Bookish</h1>

          <div className="w-24 h-1 bg-amber-400 rounded-full mt-6" />

          <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-md">
            Join the Bookish community and start exploring thousands of books.
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
                Sign Up
              </h2>

              <p className="text-center text-white/50 mt-2">
                Create your library account
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-white/70 mb-2">Full Name</label>

                <input
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-400"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2">Email</label>

                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-2">Phone Number</label>

                <input
                  name="phoneNo"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="
      w-full
      px-4
      py-3
      rounded-xl
      bg-white/5
      border
      border-white/10
      text-white
      outline-none
      focus:border-amber-400
    "
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2">Password</label>

                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2">
                  Confirm Password
                </label>

                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-all"
              >
                Create Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white/50 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-400 hover:text-amber-300 font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        setSuccess(true);

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-green-700 to-green-900 flex items-center justify-center overflow-hidden">

      <div className="w-full max-w-md p-10">
        <div
          className={`bg-white rounded-3xl shadow-2xl p-10 transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${
            success ? "h-60 w-full" : ""
          }`}
        >
          {!success ? (
            // Login Form
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex justify-center mb-6">
                <Image
                  src="/assets/SPCLOGO.avif"
                  alt="LMS Logo"
                  width={96}
                  height={96}
                  className="rounded-full shadow-lg object-cover"
                />
              </div>

              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Welcome Back</h2>

              {error && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>}

              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900 bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900 bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-700 text-sm">Remember Me</span>
                </label>
                <a href="#" className="text-green-600 text-sm hover:underline">Forgot?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transition flex items-center justify-center space-x-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && (
                  <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                )}
                <span>{loading ? "Logging in..." : "Login"}</span>
              </button>
            </form>
          ) : (
            // Success View
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-green-500 rounded-full flex items-center justify-center animate-check">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-700">Login Successful!</h2>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes checkAnim {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-check {
          animation: checkAnim 0.8s ease-out forwards;
        }
      `}</style>

    </div>
  );
};

export default LoginPage;

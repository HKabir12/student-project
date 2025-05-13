import { useState, useContext } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      login(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 h-full">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md sm:w-96"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-amber-500">
          Login
        </h2>
        {error && (
          <p className="mb-3 text-sm text-center text-red-500">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full p-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

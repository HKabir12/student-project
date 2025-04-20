import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/auth/register', formData);
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 1500); // redirect to login page
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Register</h2>
        {message && <p className="mb-2 text-sm text-center text-blue-600">{message}</p>}

        <div className="mb-4">
          <input
            name="name"
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <input
            name="password"
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <select
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

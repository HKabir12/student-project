import { useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' // or 'admin'
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
    console.log(formData);
    try {
      const res = await axiosClient.post('/auth/register', formData);
      setMessage(res.data.message);
      setTimeout(() => navigate('/'), 1500); // redirect to login
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-80">
        <h2 className="mb-4 text-xl font-bold text-center">Register</h2>
        {message && <p className="mb-2 text-sm text-blue-500">{message}</p>}
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full p-2 mb-2 border" required />
        <input name="email" onChange={handleChange} placeholder="Email" type="email" className="w-full p-2 mb-2 border" required />
        <input name="password" onChange={handleChange} placeholder="Password" type="password" className="w-full p-2 mb-2 border" required />
        <select name="role" onChange={handleChange} className="w-full p-2 mb-4 border">
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full p-2 text-white bg-blue-500 rounded">Register</button>
      </form>
    </div>
  );
}

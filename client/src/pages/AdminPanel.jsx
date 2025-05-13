import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AdminPanel() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ name: "", department: "", email: "" });
  const [error, setError] = useState("");

  // ➔ সব টিচার লোড করবে
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(res.data);
    } catch (err) {
      setError("Failed to load teachers.");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ➔ টিচার এড করার জন্য
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/teachers", formData);
      setFormData({ name: "", department: "", email: "" });
      fetchTeachers(); // নতুন টিচার এড হওয়ার পর রিফ্রেশ করবে
    } catch (err) {
      setError("Failed to add teacher.");
    }
  };

  // ➔ টিচার ডিলিট করার জন্য
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      fetchTeachers(); // ডিলিট করার পর রিফ্রেশ করবে
    } catch (err) {
      setError("Failed to delete teacher.");
    }
  };




  return (
    <div className="mt-32 px-4 sm:px-6 lg:px-8 text-center ">
      {/* Admin Panel Heading */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">
        Admin Panel
      </h2>
      <p className="mt-2 text-sm sm:text-base text-gray-600">
        Here admin can manage students, teachers and settings.
      </p>
      <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Teacher Panel</h2>

      {/* Add Teacher Form */}
      <form onSubmit={handleAddTeacher} className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Add Teacher
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Teacher List */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Teachers List</h3>
        <div className="space-y-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="flex justify-between items-center border p-4 rounded bg-gray-100">
              <div>
                <p className="font-bold">{teacher.name}</p>
                <p className="text-sm">{teacher.department}</p>
                <p className="text-sm">{teacher.email}</p>
              </div>
              <button
                onClick={() => handleDelete(teacher.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
      
    </div>
  );
}

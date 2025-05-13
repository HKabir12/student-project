import { useState } from "react";
import axios from "axios";
import Chatbot from "../components/Chatbot";

export default function StudentPanel() {
  const [searchId, setSearchId] = useState(""); // Search input for ID or roll number
  const [studentData, setStudentData] = useState(null); // To store student data
  const [error, setError] = useState(""); // To store error messages

  // Handle the search when the user clicks the search button
  const handleSearch = async () => {
    try {
      setError(""); // Reset error message
      // Call the backend API with the provided search ID
      const response = await axios.get(
        `http://localhost:5000/api/student/${searchId}`
      );
      setStudentData(response.data); // Set the response data to state
    } catch (err) {
      setError("Student not found!"); // Set error message if no student found
      setStudentData(null); // Reset student data
    }
  };

  return (
    <div className="mt-32 text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-blue-700">Student Dashboard</h2>
      <p className="mt-2 text-gray-600">
        Search for student details using ID or Roll Number
      </p>

      {/* Search Section */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)} // Update searchId state on input change
          placeholder="Enter Student ID or Roll"
          className="px-4 py-2 border rounded-md w-full sm:w-64"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Student Data Show */}
      {studentData && (
        <div className="mt-6 border rounded p-4 text-left max-w-md mx-auto bg-gray-50">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Student Details:
          </h3>
          <p>
            <span className="font-semibold">Name:</span> {studentData.name}
          </p>
          <p>
            <span className="font-semibold">ID:</span> {studentData.studentId}
          </p>
          <p>
            <span className="font-semibold">Roll:</span> {studentData.roll}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {studentData.department}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {studentData.email}
          </p>
        </div>
      )}
      <Chatbot></Chatbot>
    </div>
  );
}

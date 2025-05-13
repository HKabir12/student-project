import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import Chatbot from "../components/Chatbot";

const socket = io("http://localhost:5000");

export default function TeacherPanel() {
  const { user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);
  
  const [searchId, setSearchId] = useState("");
  const [studentData, setStudentData] = useState(null);

  const [teacherList, setTeacherList] = useState([]);
  const [searchTeacher, setSearchTeacher] = useState("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    // Load teacher list
    const fetchTeachers = async () => {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeacherList(res.data);
    };
    fetchTeachers();

    // Listen to incoming messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`New Message: ${newMessage.message}`);
      }
    });

    if ('Notification' in window) {
      Notification.requestPermission();
    }

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const searchStudent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/student/${searchId}`);
      setStudentData(res.data);
    } catch {
      setStudentData(null);
      alert("Student not found!");
    }
  };
  const searchTeacherFind = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/student/${searchId}`);
      setStudentData(res.data);
    } catch {
      setStudentData(null);
      alert("Student not found!");
    }
  };

  const filteredTeachers = teacherList.filter(t =>
    t.name.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: user?.name || "Teacher", receiver: "Student", message };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  const uploadResult = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/results", {
        studentId,
        subject,
        marks
      });
      alert("Result uploaded successfully!");
      setStudentId("");
      setSubject("");
      setMarks("");
    } catch {
      alert("Failed to upload result!");
    }
  };

  return (
    <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Teacher Panel</h2>

      {!isLoggedIn ? (
        <div>
          <h3 className="text-lg text-gray-700">Teacher Login</h3>
          <button
            onClick={handleLogin}
            className="mt-4 px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Login as Teacher
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">

            {/* Student Search */}
            <div className="flex-1 p-4 border rounded bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Search Student</h3>
              <input
                type="text"
                placeholder="Enter Student ID or Roll"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={searchStudent}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Search
              </button>

              {studentData && (
                <div className="mt-4 text-left">
                  <p><b>Name:</b> {studentData.name}</p>
                  <p><b>ID:</b> {studentData.studentId}</p>
                  <p><b>Roll:</b> {studentData.roll}</p>
                  <p><b>Department:</b> {studentData.department}</p>
                  <p><b>Email:</b> {studentData.email}</p>
                </div>
              )}
            </div>

            {/* Teacher List */}
            <div className="flex-1 p-4 border rounded bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Search Teacher</h3>
              <input
                type="text"
                placeholder="Search by name"
                value={searchTeacher}
                onChange={(e) => setSearchTeacher(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={searchTeacherFind}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Search
              </button>
              <ul className="text-left">
                {filteredTeachers.map(t => (
                  <li key={t.id} className="mb-1">{t.name} - {t.department}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chat Section */}
          {/* <div className="mt-8 p-4 border rounded bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Chat with Students</h3>
            <div className="h-64 overflow-y-auto border p-2 mb-2 bg-white rounded">
              {messages.map((m, i) => (
                <div key={i} className="p-2 mb-1 bg-gray-200 rounded">
                  <b>{m.sender}:</b> {m.message}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div> */}
          < Chatbot></Chatbot>

          {/* Upload Result */}
          <div className="mt-8 p-4 border rounded bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Student Result</h3>
            <form onSubmit={uploadResult} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Upload Result
              </button>
            </form>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Welcome, {user?.name}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600">
          Role: <span className="font-medium text-blue-600">{user?.role}</span>
        </p>
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="mt-6 px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base bg-red-500 hover:bg-red-600 text-white rounded-xl transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

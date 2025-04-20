import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
      <p className="mt-2">Role: {user?.role}</p>
      <button
        onClick={() => {
          logout();
          navigate('/');
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

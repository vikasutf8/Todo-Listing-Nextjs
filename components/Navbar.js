// components/Navbar.js
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Todo App</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.email}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => router.push("/login")} className="bg-blue-500 px-4 py-2 rounded">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

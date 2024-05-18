import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Auth({ isLogin }) {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 p-2 border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {isLogin ? "Login" : "Signup"}
      </button>
    </form>
  );
}

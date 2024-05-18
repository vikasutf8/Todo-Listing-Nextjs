// pages/signup.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to sign up");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to sign up with Google");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Signup</h1>
      <form onSubmit={handleSignup} className="flex flex-col">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Signup
        </button>
      </form>
      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Sign up with Google
      </button>
    </div>
  );
}

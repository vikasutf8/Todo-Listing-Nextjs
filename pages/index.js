import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function Home() {
  const { user, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
      setShowMessage(true);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const q = query(collection(db, "todos"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosArr = [];
      snapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
      setShowLoading(false); // Hide loading animation once todos are fetched
    });

    return () => unsubscribe();
  }, [user, loading]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      await addDoc(collection(db, "todos"), {
        text: newTodo,
        completed: false,
        uid: user.uid,
      });
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      const todo = todos.find((todo) => todo.id === id);
      await updateDoc(todoRef, { completed: !todo.completed });
    } catch (error) {
      console.error("Error toggling completion:", error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  if (showLoading || loading) {
    // Show loading animation
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user && showMessage) {
    // Show welcome message and login/signup buttons
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Todo App</h1>
          <p className="text-xl">Please login or sign up</p>
        </div>
        <div>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    // Don't render anything until user state is resolved
    return null;
  }

  // Render todo functionality after login
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <p>Welcome, {user.email}!</p>
        <form onSubmit={addTodo} className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Add a new task"
          />
          <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
        <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

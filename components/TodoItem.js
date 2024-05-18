import React from "react";

export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded shadow mb-2">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <span className={`ml-2 ${todo.completed ? "line-through" : ""}`}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
        Delete
      </button>
    </div>
  );
}

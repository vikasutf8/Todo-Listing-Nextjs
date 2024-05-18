import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Set key here
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

import { useSyncExternalStore } from "react";

import todoStore from "../store/todoStore";

export const useTodoList = (search?: string) => {
  const todos = useSyncExternalStore(todoStore.subscribe, todoStore.getTodos);

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(search?.toLowerCase() ?? ""),
  );

  return filteredTodos;
};

/**
 * since the store is a singleton, we can directly use the store methods
 * without the need to pass the store instance around
 *
 * also separate the store methods from the store itself to avoid re-renders
 * when the store changes. This way, we can use the store methods in the components
 * and easily refactor when the structure of the components changes
 */
export const useTodoActions = () => {
  return {
    addTodo: todoStore.addTodo,
    completeTodo: todoStore.completeTodo,
    uncompleteTodo: todoStore.uncompleteTodo,
    removeTodo: todoStore.removeTodo,
    editTodo: todoStore.editTodo,
  };
};

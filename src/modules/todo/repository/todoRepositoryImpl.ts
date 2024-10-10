import type { TodoRepository } from "#/modules/todo/domain/todoRepository";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "#/modules/todo/repository/fakeDatasource/todoDatasource";

const todoRepositoryImpl = (): TodoRepository => {
  return {
    addTodo: (task) => {
      addTodo(task);
    },
    getTodos: () => {
      return getTodos();
    },
    completeTodo: (id: string) => {
      updateTodo(id, { completed: true });
    },
    uncompleteTodo: (id: string) => {
      updateTodo(id, { completed: false });
    },
    removeTodo: (id: string) => {
      deleteTodo(id);
    },
    editTodo: (id: string, task: string) => {
      updateTodo(id, { title: task });
    },
  };
};

export default todoRepositoryImpl();

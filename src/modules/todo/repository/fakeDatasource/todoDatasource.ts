import { v4 as uuid } from "uuid";

import { mapTodosDsToEntity } from "#/modules/todo/repository/fakeDatasource/todoMapper";

export interface TodoDs {
  id: string;
  title: string;
  completed: boolean;
}

const todoStore: { [key: string]: TodoDs } = {};

export const addTodo = (todo: string): void => {
  const id = uuid();
  todoStore[id] = {
    id,
    title: todo,
    completed: false,
  };
};

export const getTodo = (id: string): TodoDs | undefined => {
  return todoStore[id];
};

export const getTodos = () => {
  return mapTodosDsToEntity(Object.values(todoStore));
};

export const updateTodo = (id: string, updatedTodo: Partial<TodoDs>): void => {
  if (todoStore[id]) {
    todoStore[id] = { ...todoStore[id], ...updatedTodo };
  }
};

export const deleteTodo = (id: string): void => {
  delete todoStore[id];
};

export default todoStore;

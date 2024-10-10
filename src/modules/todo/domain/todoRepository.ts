import type { Todo } from "#/modules/todo/domain/entity/todo";

export interface TodoRepository {
  addTodo: (task: string) => void;
  getTodos: () => Todo[];
  completeTodo: (id: string) => void;
  uncompleteTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, task: string) => void;
}

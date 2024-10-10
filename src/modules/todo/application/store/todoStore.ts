import type { Todo } from "#/modules/todo/domain/entity/todo";
import todoRepositoryImpl from "#/modules/todo/repository/todoRepositoryImpl";

export type TodoListener = (todo: Todo[]) => void;

const createTodoStore = () => {
  let todos: Todo[] = [];
  const listeners = new Set<TodoListener>();

  const addTodo = (task: string): void => {
    todoRepositoryImpl.addTodo(task);
    todos = todoRepositoryImpl.getTodos();
    notifyListeners();
  };

  const getTodos = (): Todo[] => {
    return todos;
  };

  const completeTodo = (id: string): void => {
    todoRepositoryImpl.completeTodo(id);
    todos = todoRepositoryImpl.getTodos();
    notifyListeners();
  };

  const uncompleteTodo = (id: string): void => {
    todoRepositoryImpl.uncompleteTodo(id);
    todos = todoRepositoryImpl.getTodos();
    notifyListeners();
  };

  const removeTodo = (id: string): void => {
    todoRepositoryImpl.removeTodo(id);
    todos = todoRepositoryImpl.getTodos();
    notifyListeners();
  };

  const editTodo = (id: string, task: string): void => {
    todoRepositoryImpl.editTodo(id, task);
    todos = todoRepositoryImpl.getTodos();
    notifyListeners();
  };

  const subscribe = (listener: TodoListener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const notifyListeners = () => {
    listeners.forEach((listener) => listener(todos));
  };

  return {
    addTodo,
    getTodos,
    completeTodo,
    uncompleteTodo,
    removeTodo,
    editTodo,
    subscribe,
  };
};

const todoStore = createTodoStore();
export default todoStore;

import todoStore from "../todoStore";

import type { Todo } from "#/modules/todo/domain/entity/todo";
import todoRepositoryImpl from "#/modules/todo/repository/todoRepositoryImpl";

jest.mock("#/modules/todo/repository/todoRepositoryImpl");

const todoRepositoryImplMock = todoRepositoryImpl as jest.Mocked<
  typeof todoRepositoryImpl
>;

describe("todoStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a todo", () => {
    const task = "New Task";
    const todos: Todo[] = [{ id: "1", task, completed: false }];
    (todoRepositoryImplMock.getTodos as jest.Mock).mockReturnValue(todos);

    todoStore.addTodo(task);

    expect(todoRepositoryImplMock.addTodo).toHaveBeenCalledWith(task);
    expect(todoStore.getTodos()).toEqual(todos);
  });

  it("should complete a todo", () => {
    const id = "1";
    const todos: Todo[] = [{ id, task: "Task", completed: true }];
    (todoRepositoryImplMock.getTodos as jest.Mock).mockReturnValue(todos);

    todoStore.completeTodo(id);

    expect(todoRepositoryImplMock.completeTodo).toHaveBeenCalledWith(id);
    expect(todoStore.getTodos()).toEqual(todos);
  });

  it("should uncomplete a todo", () => {
    const id = "1";
    const todos: Todo[] = [{ id, task: "Task", completed: false }];
    (todoRepositoryImplMock.getTodos as jest.Mock).mockReturnValue(todos);

    todoStore.uncompleteTodo(id);

    expect(todoRepositoryImplMock.uncompleteTodo).toHaveBeenCalledWith(id);
    expect(todoStore.getTodos()).toEqual(todos);
  });

  it("should remove a todo", () => {
    const id = "1";
    const todos: Todo[] = [];
    (todoRepositoryImplMock.getTodos as jest.Mock).mockReturnValue(todos);

    todoStore.removeTodo(id);

    expect(todoRepositoryImplMock.removeTodo).toHaveBeenCalledWith(id);
    expect(todoStore.getTodos()).toEqual(todos);
  });

  it("should edit a todo", () => {
    const id = "1";
    const task = "Updated Task";
    const todos: Todo[] = [{ id, task, completed: false }];
    (todoRepositoryImplMock.getTodos as jest.Mock).mockReturnValue(todos);

    todoStore.editTodo(id, task);

    expect(todoRepositoryImplMock.editTodo).toHaveBeenCalledWith(id, task);
    expect(todoStore.getTodos()).toEqual(todos);
  });

  it("should notify listeners on changes", () => {
    const listener = jest.fn();
    const task = "New Task";
    const todos: Todo[] = [{ id: "1", task, completed: false }];
    (todoRepositoryImplMock.getTodos as jest.Mock).mockReturnValue(todos);

    const unsubscribe = todoStore.subscribe(listener);
    todoStore.addTodo(task);

    expect(listener).toHaveBeenCalledWith(todos);

    unsubscribe();
    todoStore.addTodo("Another Task");

    expect(listener).toHaveBeenCalledTimes(1);
  });
});

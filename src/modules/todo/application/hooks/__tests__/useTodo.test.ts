import { renderHook, act } from "@testing-library/react";

import todoStore from "../../store/todoStore";
import { useTodoList, useTodoActions } from "../useTodo";

jest.mock<typeof todoStore>("../../store/todoStore");

const mockedTodoStore = todoStore as jest.Mocked<typeof todoStore>;

describe("useTodoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return filtered todos based on search query", () => {
    const mockTodos = [
      { id: "1", task: "Test Todo", completed: false },
      { id: "2", task: "Another Task", completed: false },
    ];
    mockedTodoStore.getTodos.mockReturnValue(mockTodos);

    const { result } = renderHook(() => useTodoList("test"));

    expect(result.current).toEqual([
      { id: "1", task: "Test Todo", completed: false },
    ]);
  });

  it("should return all todos if no search query is provided", () => {
    const mockTodos = [
      { id: "1", task: "Test Todo", completed: false },
      { id: "2", task: "Another Task", completed: false },
    ];
    mockedTodoStore.getTodos.mockReturnValue(mockTodos);

    const { result } = renderHook(() => useTodoList());

    expect(result.current).toEqual(mockTodos);
  });
});

describe("useTodoActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call addTodo on todoStore", () => {
    const { result } = renderHook(() => useTodoActions());

    act(() => {
      result.current.addTodo("New Todo");
    });

    expect(mockedTodoStore.addTodo).toHaveBeenCalledWith("New Todo");
  });

  it("should call completeTodo on todoStore", () => {
    const { result } = renderHook(() => useTodoActions());
    const todoId = "1";

    act(() => {
      result.current.completeTodo(todoId);
    });

    expect(mockedTodoStore.completeTodo).toHaveBeenCalledWith(todoId);
  });

  it("should call uncompleteTodo on todoStore", () => {
    const { result } = renderHook(() => useTodoActions());
    const todoId = "1";

    act(() => {
      result.current.uncompleteTodo(todoId);
    });

    expect(mockedTodoStore.uncompleteTodo).toHaveBeenCalledWith(todoId);
  });

  it("should call removeTodo on todoStore", () => {
    const { result } = renderHook(() => useTodoActions());
    const todoId = "1";

    act(() => {
      result.current.removeTodo(todoId);
    });

    expect(mockedTodoStore.removeTodo).toHaveBeenCalledWith(todoId);
  });

  it("should call editTodo on todoStore", () => {
    const { result } = renderHook(() => useTodoActions());
    const todoId = "1";
    const newText = "Updated Todo";

    act(() => {
      result.current.editTodo(todoId, newText);
    });

    expect(mockedTodoStore.editTodo).toHaveBeenCalledWith(todoId, newText);
  });
});

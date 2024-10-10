"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback, useState } from "react";

import { debounce } from "#/lib/utils";
import {
  useTodoActions,
  useTodoList,
} from "#/modules/todo/application/hooks/useTodo";
import TodoListItem from "#/modules/todo/presentation/TodoListItem";
import { Button } from "#/shared/components/primitives/button";
import { Input } from "#/shared/components/primitives/input";

const TodoList: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [search, setSearch] = useState("");
  const todos = useTodoList(search);
  const { addTodo, completeTodo, editTodo, removeTodo, uncompleteTodo } =
    useTodoActions();

  const _onCompleteChange = useCallback(
    (id: string, checked: boolean) => {
      if (checked) {
        return completeTodo(id);
      }
      return uncompleteTodo(id);
    },
    [completeTodo, uncompleteTodo],
  );

  return (
    <>
      <div className="flex flex-1 gap-x-2 py-2 px-3">
        <Input
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search todo..."
          type="search"
          onChange={debounce((e) => setSearch(e.target.value), 300)}
        />
        <Button
          onClick={() => {
            addTodo("");
            setSearch("");
          }}
        >
          Add Todo
        </Button>
      </div>
      <ul>
        {todos.map((todo) => {
          const shouldFocus =
            todo.id === todos[todos.length - 1].id && !isSearchFocused;
          return (
            <TodoListItem
              {...todo}
              key={todo.id}
              shouldFocus={shouldFocus}
              onCompleteChange={_onCompleteChange}
              onRemove={removeTodo}
              onTaskNameChange={editTodo}
            />
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;

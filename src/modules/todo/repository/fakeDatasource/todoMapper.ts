import * as todo from "#/modules/todo/domain/entity/todo";
import type { TodoDs } from "#/modules/todo/repository/fakeDatasource/todoDatasource";

export const mapTodosDsToEntity = (todos: TodoDs[]): todo.Todo[] => {
  return todos.map((t) =>
    todo.create({
      completed: t.completed,
      id: t.id,
      task: t.title,
    }),
  );
};

import { z } from "zod";

// Define the Todo schema using Zod
export const todo = z.object({
  id: z.string(),
  task: z.string(),
  completed: z.boolean(),
});

// Define the Todo type from the schema
type TodoSchema = Partial<z.infer<typeof todo>>;

export type Todo = Required<z.infer<typeof todo>>;

export const create = (data: TodoSchema) => {
  const item = todo.parse(data);

  return item;
};

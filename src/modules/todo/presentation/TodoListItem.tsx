import { memo, useEffect, useRef } from "react";

import { Checkbox } from "#/components/ui/checkbox";
import { cn } from "#/lib/utils";
import type { Todo } from "#/modules/todo/domain/entity/todo";
import { Button } from "#/shared/components/primitives/button";

interface TodoListItemProps extends Todo {
  shouldFocus?: boolean;
  onTaskNameChange?: (id: string, task: string) => void;
  onRemove?: (id: string) => void;
  onCompleteChange?: (id: string, checked: boolean) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  id,
  task,
  completed,
  shouldFocus,
  onCompleteChange,
  onRemove,
  onTaskNameChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus) {
      inputRef.current?.focus();
    }
  }, [shouldFocus, task]);

  const _onTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const task = formData.get("task") as string;
    if (task) {
      return onTaskNameChange?.(id, task);
    }
  };

  return (
    <li
      className="flex flex-row w-full justify-between items-center gap-x-4 px-3 py-2"
      key={id}
    >
      <Checkbox
        className="w-5 h-5"
        defaultChecked={completed}
        onCheckedChange={(val) =>
          onCompleteChange?.(id, Boolean(val.valueOf()))
        }
      />

      <form onSubmit={_onTaskSubmit} className="flex flex-1 flex-grow">
        <input
          className={cn(
            completed && "line-through text-slate-500",
            "border-b flex-1 outline-none pb-1 focus-visible:border-b focus-visible:border-slate-700/70",
          )}
          name="task"
          placeholder="Please enter task"
          defaultValue={task}
          ref={inputRef}
          onBlur={(e) => onTaskNameChange?.(id, e.target.value)}
        />
      </form>
      <Button
        onClick={() => onRemove?.(id)}
        variant="destructive"
        size="default"
      >
        Remove
      </Button>
    </li>
  );
};

export default memo(TodoListItem);

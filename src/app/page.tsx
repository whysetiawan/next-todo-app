// import TodoList from "#/modules/todo/presentation/TodoList";
import dynamic from "next/dynamic";

import Greeting from "#/modules/time/presentation/Greeting";

const TodoList = dynamic(() => import("#/modules/todo/presentation/TodoList"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <header className="sticky top-0 w-full max-w-[600px] flex flex-col justify-center gap-y-2">
        <Greeting />
        <h1 className="font-bold text-2xl text-center">Todo List App</h1>
      </header>
      <main className="flex flex-col w-full max-w-[600px]">
        <TodoList />
      </main>
    </div>
  );
}

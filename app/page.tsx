import ButtonAdd from "./components/ButtonAdd";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <ButtonAdd />
      </div>
      <TodoList />
    </main>
  );
}

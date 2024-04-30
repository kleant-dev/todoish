import { useState } from "react";
import { Todo, useTodos } from "./TodoContext";

function TodoForm() {
  const [title, setTitle] = useState<string>("");
  const { dispatch, todos } = useTodos();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title) return;
    const newTodo: Todo = {
      title,
      finished: false,
      id: todos.length + 1,
    };
    dispatch({ type: "todos/add", payload: newTodo });
    setTitle("");
  }
  return (
    <div className="py-8 w-full flex justify-center align-center">
      <form
        onSubmit={handleSubmit}
        className="my-0 mx-auto w-2/3 flex justify-center py-2"
      >
        <input
          className="outline-none px-3 py-2 w-2/3  border-[0.5px]  border-main rounded-md  "
          type="text"
          value={title}
          placeholder="I have to do ..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="uppercase active:ring ring-offset-1 px-3 py-2 ml-2 border-2 border-none rounded-md bg-main text-white font-semibold"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;

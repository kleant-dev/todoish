import { useTodos } from "./TodoContext";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todos, dispatch } = useTodos();

  return (
    <>
      <ul className="py-12 px-32 bg-bg flex flex-col gap-6">
        {todos.map((todo) => (
          <TodoItem
            title={todo.title}
            finished={todo.finished}
            id={todo.id}
            key={todo.id}
          />
        ))}
      </ul>
      {todos.length > 0 && (
        <div className="font-bold text-xl text-stone-500  px-32 w-full flex justify-between align-center">
          <p
            onClick={() => dispatch({ type: "todos/clear" })}
            className="transition-all duration-300 border-b-2 border-main hover:border-b-transparent hover:cursor-pointer"
          >
            Clear All
          </p>
          {todos.some((todo) => todo.finished) && (
            <p
              onClick={() => dispatch({ type: "todos/clearFinished" })}
              className="transition-all duration-300 border-b-2 border-main hover:border-b-transparent hover:cursor-pointer"
            >
              Clear Completed
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default TodoList;

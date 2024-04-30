import { TodoProvider } from "./components/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="w-full h-screen overflow-scroll bg-bg">
      <div className="sm:my-0 sm:mx-auto sm:w-full">
        <TodoProvider>
          <TodoForm />
          <TodoList />
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;

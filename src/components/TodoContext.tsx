/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";

const TodoContext = createContext<
  | {
      todos: Todo[];
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

type Action =
  | { type: "todos/add"; payload: Todo }
  | { type: "todos/delete"; payload: number }
  | { type: "todos/clear" }
  | { type: "todos/clearFinished" }
  | { type: "todos/finish"; payload: number };

export type Todo = {
  title: string;
  finished: boolean;
  id: number;
};

const initialState: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

function reducer(state: Todo[], action: Action): Todo[] {
  let nextState: Todo[];
  switch (action.type) {
    case "todos/add":
      nextState = [...state, action.payload];
      localStorage.setItem("todos", JSON.stringify(nextState));
      return nextState;
    case "todos/delete":
      nextState = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(nextState));
      return nextState;
    case "todos/finish":
      nextState = state.map((todo) => {
        return todo.id === action.payload
          ? { ...todo, finished: !todo.finished }
          : todo;
      });
      localStorage.setItem("todos", JSON.stringify(nextState));
      return nextState;
    case "todos/clear":
      nextState = [];
      localStorage.setItem("todos", JSON.stringify(nextState));
      return nextState;
    case "todos/clearFinished":
      nextState = state.filter((todo) => !todo.finished);
      localStorage.setItem("todos", JSON.stringify(nextState));
      return nextState;
    default:
      throw new Error("Unknown action type");
  }
}

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TodoProvider, useTodos };

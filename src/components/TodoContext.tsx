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

const initialState: Todo[] = [];

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "todos/add":
      return [...state, action.payload];
    case "todos/delete":
      return state.filter((todo) => todo.id !== action.payload);
    case "todos/finish":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, finished: !todo.finished }
          : todo
      );
    case "todos/clear":
      return [];
    case "todos/clearFinished":
      return state.filter((todo) => !todo.finished);
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

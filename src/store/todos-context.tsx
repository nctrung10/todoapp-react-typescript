import React, { useState, useEffect } from 'react';

import createTodo, { Todo } from '../models/todo';
import useHttp from '../hooks/use-http';

// Create a context for define default/initial Value
type TodosContextType = {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextType>({
  items: [],
  isLoading: false,
  error: null,
  addTodo: () => {},
  deleteTodo: () => {}
});

// Context Provider
type ProviderProps = {
  children: React.ReactNode;
};

const TodosContextProvider = ({ children }: ProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isLoading, error, sendRequest: fetchTodosData } = useHttp();
  const { sendRequest: deleteTodoRequest } = useHttp();

  // Fetch tasks from server
  useEffect(() => {
    const transformData = (todos: any) => {
      const loadedTodos = Object.keys(todos);

      loadedTodos.map(item => setTodos(prev => [
        { id: item, text: todos[item].text },
        ...prev
      ]));
    };

    fetchTodosData(
      { url: 'https://react-ts-todoapp-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json' },
      transformData
    );    
  }, [fetchTodosData]);

  // Add a new task
  const addTodoHandler = (todo: Todo) => {   
    setTodos(prev => [
      createTodo(todo), // createTodo() will return an object with id, text, date (optional),...
      ...prev
    ]);
  };

  // Delete a task
  const deleteTodoHandler = (todoId: string) => {
    deleteTodoRequest({
      url: `https://react-ts-todoapp-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${todoId}.json`,
      method: 'DELETE'
    });

    setTodos((prev) => prev.filter(({ id }) => id !== todoId));
  };

  const contextValue: TodosContextType = {
    items: todos,
    isLoading,
    error,
    addTodo: addTodoHandler,
    deleteTodo: deleteTodoHandler
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
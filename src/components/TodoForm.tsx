import { useRef, useState, useContext } from "react";

import { TodosContext } from "../store/todos-context";
import useHttp from "../hooks/use-http";

const TodoForm = () => {
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, error, sendRequest: createTodoRequest } = useHttp();

  const appCtx = useContext(TodosContext);

  const changeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value.trim() !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const refValue = inputRef.current!.value; // current! - it means current never be null in this case
    const valueWithoutSpace = refValue.trim();

    if (valueWithoutSpace === '') {
      // throw an error
      return;
    }

    const newTodoData = {
      text: valueWithoutSpace,
      date: new Date().toLocaleDateString("vi-VN")
    };

    const createTodo = (todoData: any) => {
      const generateId: string = todoData.name;
      const createdTodo = { id: generateId, ...newTodoData };

      appCtx.addTodo(createdTodo);
    };

    createTodoRequest(
      {
        url: 'https://react-ts-todoapp-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json',
        method: 'POST',
        body: newTodoData,
        headers: {
          'Content-type': 'application/json'
        }
      },
      createTodo
    );

    inputRef.current!.value = '';
    setIsValid(false);
  };

  return (
    <form className="block mb-6 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 mx-0 sm:mx-auto" onSubmit={submitHandler} autoComplete="off">
      <label htmlFor="todo" className="block font-medium text-slate-700 dark:text-slate-300">Todo Text</label>
      <input
        ref={inputRef}
        onChange={changeHandler}
        type="text"
        id="todo"
        placeholder="Enter a task"
        className="block mt-1 w-full px-3 py-2 bg-sky-50 border-b-2 border-slate-500 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 shadow-sm"
      />
      <button
        className="block mt-4 w-full rounded-md bg-sky-600 hover:bg-sky-700 py-2 text-white font-medium disabled:opacity-50 disabled:hover:bg-sky-600"
        disabled={!isValid}
      >
        {isLoading ? 'Sending...' : 'Add Todo'}
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default TodoForm;
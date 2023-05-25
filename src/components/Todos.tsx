import { useContext } from 'react';

import TodoItem from './TodoItem';
import { TodosContext } from '../store/todos-context';

const Todos = () => {
  const appCtx = useContext(TodosContext);
  const items = appCtx.items;
  
  // type for JSX Element or Array of Element
  let initialContent: JSX.Element | JSX.Element[] = (
    <h1 className="text-slate-600 dark:text-slate-200 font-medium">Add your to-do tasks.</h1>
  );

  if (items.length > 0) {
    initialContent = items.map(item => (
      <TodoItem
        key={item.id}
        {...item}
        onDeleteTodo={appCtx.deleteTodo.bind(null, item.id)}
      // onDeleteTodo={() => appCtx.deleteTodo(item.id)}
      />
    ));
  }

  let content: any = initialContent;

  if (appCtx.isLoading) {
    content = <p className="dark:text-white">Loading data...</p>;
  }

  if (appCtx.error) {
    content = <p className="text-red-600">{appCtx.error}</p>;
  }

  return (
    <>
      <ul className="my-4 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 mx-0 sm:mx-auto">
        {content}
      </ul>
    </>
  );
};

export default Todos;

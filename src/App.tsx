import TodosContextProvider from './store/todos-context';

import Todos from './components/Todos';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <TodosContextProvider>
      <div className="p-5 dark:bg-slate-800 h-auto min-h-screen">
        <h1 className="text-3xl font-bold text-sky-600 mb-4">To-do App</h1>
        <TodoForm />
        <Todos />
      </div>
    </TodosContextProvider>
  );
}

export default App;

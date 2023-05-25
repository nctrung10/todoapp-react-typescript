// Type alias
type TodoItemProps = {
  text: string;
  onDeleteTodo: () => void;
};

const TodoItem = ({ text, onDeleteTodo }: TodoItemProps) => {
  return (
    <li className="flex items-center justify-between my-2 p-4 bg-sky-100 shadow-md">
      {text}
      <span
        className="ml-4 font-bold cursor-pointer select-none text-lg text-red-600 hover:text-red-400"
        onClick={onDeleteTodo}
      >
        x
      </span>
    </li >
  );
};

export default TodoItem;
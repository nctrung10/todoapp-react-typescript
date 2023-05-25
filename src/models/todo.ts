// Class version
// class Todo {
//   id: string;
//   text: string;

//   constructor(todoText: string) {
//     this.id = Math.random().toString();
//     this.text = todoText;
//   }
// }

// export default Todo;

// Function version
export interface Todo {
  id: string;
  text: string;
  date?: string;
}

export default function createTodo({ id, text, date }: Todo) {
  return { id, text, date };
};

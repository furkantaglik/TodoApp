import { useEffect, useState } from "react";
import { Chart } from "./Chart";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { TodoModel } from "@/models/todoModel";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFetch } from "@/hooks/useFetch";

export default function TodoBoard() {
  const { user } = useAuthContext();
  const { Fetch } = useFetch();
  const [todos, setTodos] = useState<Array<TodoModel>>([]);

  async function getTodosByUserId() {
    const response = await Fetch(`todos/getbyuserid`);
    setTodos((response.data as TodoModel[]) || []);
  }

  useEffect(() => {
    getTodosByUserId();
  }, [user]);

  const handleTodoUpdate = () => {
    getTodosByUserId();
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const incompleteCount = totalCount - completedCount;

  return (
    <section className="flex flex-col lg:flex-row mx-auto max-w-screen-lg lg:border p-3 lg:h-[600px] w-full">
      <div className="flex flex-col justify-between items-center w-full lg:w-6/12 mx-auto">
        <div className="w-full flex items-center justify-center">
          <Chart
            completedCount={completedCount}
            incompleteCount={incompleteCount}
          />
        </div>
        <div className="w-full">
          <NewTodo onUpdate={handleTodoUpdate} />
        </div>
      </div>
      <div className="lg:border-l lg:overflow-y-auto flex flex-col items-center mx-auto w-6/12 lg:border-t-0 border-t mt-10 lg:mt-0 pt-10  lg:pt-0">
        <h1 className="text-2xl font-semibold text-center mb-5">Todo Listem</h1>
        <TodoList todos={todos} onUpdate={handleTodoUpdate} />
      </div>
    </section>
  );
}

import { TodoModel } from "@/models/todoModel";
import TodoCard from "./TodoCard";
import { Skeleton } from "./ui/skeleton";

interface TodoListProps {
  todos: TodoModel[];
}

interface TodoListProps {
  todos: TodoModel[];
  onUpdate: () => void;
}

export default function TodoList({ todos, onUpdate }: TodoListProps) {
  return (
    <section className="gap-y-2 flex flex-col">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} onUpdate={onUpdate} />
        ))
      ) : (
        <>
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
          <Skeleton className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px]  rounded p-6" />
        </>
      )}
    </section>
  );
}

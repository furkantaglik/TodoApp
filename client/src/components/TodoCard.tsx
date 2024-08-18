import { Card } from "@/components/ui/card";
import { TodoModel } from "@/models/todoModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFetch } from "@/hooks/useFetch";

interface TodoCardProps {
  todo: TodoModel;
}
interface TodoCardProps {
  todo: TodoModel;
  onUpdate: () => void;
}

export default function TodoCard({ todo, onUpdate }: TodoCardProps) {
  const { Fetch } = useFetch();
  async function handleComplete() {
    todo.completed = !todo.completed;
    await Fetch(`todos/update`, todo, "post");
    onUpdate();
  }

  async function handleRemove() {
    await Fetch(`todos/remove/${todo.id}`);
    onUpdate();
  }

  return (
    <Card className="w-[300px] xs:w-[400px] sm:w-[600px] lg:w-[450px] flex group items-center justify-between rounded p-1 font-semibold ">
      <p
        className={`${
          todo.completed === true &&
          "line-through decoration-primary  decoration-2  truncate"
        }`}
      >
        {todo.content}
      </p>
      <div className="md:opacity-0 md:group-hover:opacity-100 cursor-pointer flex gap-x-3 justify-center items-center">
        <span
          onClick={handleComplete}
          className="text-lime-500 font-semibold text-xl hover:hue-rotate-90 rounded-full p-1"
        >
          ✓
        </span>

        <AlertDialog>
          <AlertDialogTrigger className="text-red-500 font-semibold text-2xl hover:hue-rotate-30 rounded-full p-1">
            x
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Silmek istediğine emin misin ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Bu işlem geri alınamaz ve sunucularımızdan tamamen silinir.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemove}>
                Devam
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}

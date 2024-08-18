import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

interface NewTodoProps {
  onUpdate: () => void;
}

const placeholderMessages = [
  "Bugün planların neler?",
  "Yeni görev ekleyin",
  "Görev içeriğini girin.",
  "Ne düşünüyorsunuz?",
  "Başlamak için yazın.",
];

export default function NewTodo({ onUpdate }: NewTodoProps) {
  const { Fetch } = useFetch();
  const [content, setContent] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>(
    placeholderMessages[0]
  );

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholderMessages.length;
      setPlaceholder(placeholderMessages[index]);
    }, 5000); // 5 saniyede bir placeholder değişir

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (content.trim() === "") {
      return toast.error("Boş geçilemez");
    }
    await Fetch(`todos/create`, { content }, "post");
    setContent("");
    onUpdate();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-x-5 w-full"
    >
      <Input
        placeholder={placeholder}
        className="w-[300px] transition-all fade-out-90"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">Oluştur</Button>
    </form>
  );
}

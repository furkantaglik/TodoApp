export interface TodoModel {
  id: number;
  content: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewTodoModel {
  content: string;
}

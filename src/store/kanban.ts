import { defineStore } from "pinia";

export interface KanbanState {
  boards: Board[];
}

export interface Board {
  id: string;
  name: string;
  lists: List[];
}

export interface List {
  id: string;
  name: string;
  tasks: Task[];
}

export type Status = "unfinished" | "finished" | "suspended";

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: Status;
}

const exampleKanban: KanbanState = {
  boards: [
    {
      name: "Example",
      id: "board-id",
      lists: [
        {
          name: "List #1",
          id: "list-id",
          tasks: [
            {
              id: "task-id",
              name: "Task #1",
              description: "Lorem ipsum sit amet",
              status: "unfinished",
            },
            {
              id: "task-id-2",
              name: "Task #2",
              description: "Lorem ipsum sit amet",
              status: "finished",
            },
          ],
        },
      ],
    },
  ],
};

export const useKanbanStore = defineStore("kanban", {
  state: (): KanbanState => {
    return exampleKanban;
  },
});

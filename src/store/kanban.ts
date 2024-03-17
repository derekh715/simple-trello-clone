import { defineStore } from "pinia";

export interface KanbanState {
  boards: Board[];
}

export interface Board {
  name: string;
  lists: List[];
}

export interface List {
  name: string;
  tasks: Task[];
}

export type Status = "unfinished" | "finished" | "suspended";

export interface Task {
  name: string;
  description?: string;
  status: Status;
}

const exampleKanban: KanbanState = {
  boards: [
    {
      name: "Example",
      lists: [
        {
          name: "List #1",
          tasks: [
            {
              name: "Task #1",
              status: "unfinished",
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

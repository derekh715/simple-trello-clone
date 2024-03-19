import { nanoid } from "nanoid";
import { defineStore } from "pinia";

export interface KanbanState {
  boards: Board[];
}

export interface Board {
  id: string;
  name: string;
  description: string;
  lists: List[];
}

export interface List {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export type Status = "unfinished" | "finished" | "suspended";

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: Status;
}

function findTaskIndex(
  boards: Board[],
  boardId: string,
  listId: string,
  taskId: string
) {
  const board = boards.find(({ id }) => boardId === id);
  if (board) {
    const list = board.lists.find(({ id }) => listId === id);
    if (list) {
      const taskIndex = list.tasks.findIndex(({ id }) => taskId === id);
      if (taskIndex === -1) {
        return undefined;
      }
      return {
        taskIndex,
        board,
        list,
      };
    }
  }

  return undefined;
}

function findListIndex(boards: Board[], boardId: string, listId: string) {
  const board = boards.find(({ id }) => boardId === id);
  if (board) {
    const listIndex = board.lists.findIndex(({ id }) => listId === id);
    if (listIndex === -1) {
      return undefined;
    }
    return { board, listIndex };
  }
  return undefined;
}

export const useKanbanStore = defineStore("kanban", {
  state: (): KanbanState => {
    return {
      boards: [],
    };
  },

  getters: {
    getBoard(state) {
      return function (boardId: string) {
        return state.boards.find(({ id }) => boardId === id);
      };
    },

    getList(state) {
      const that = this;
      return function (boardId: string, listId: string) {
        const board = that.getBoard(boardId);
        if (board) {
          return board.lists.find(({ id }) => listId === id);
        }
      };
    },

    getTask(state) {
      const that = this;
      return function (boardId: string, listId: string, taskId: string) {
        const list = that.getList(boardId, listId);
        if (list) {
          return list.tasks.find(({ id }) => taskId === id);
        }
      };
    },
  },

  actions: {
    addTask(boardId: string, listId: string, task: Omit<Task, "id">) {
      const board = this.boards.find(({ id }) => boardId === id);
      if (board) {
        const list = board.lists.find(({ id }) => listId === id);
        if (list) {
          const newTask: Task = {
            ...task,
            id: nanoid(),
          };
          list.tasks.push(newTask);
          return newTask;
        }
      }
      return undefined;
    },

    removeTask(boardId: string, listId: string, taskId: string) {
      const items = findTaskIndex(this.boards, boardId, listId, taskId);

      if (items) {
        const { taskIndex, list } = items;
        list!.tasks.splice(taskIndex, 1);
      }
    },

    changeTask(boardId: string, listId: string, taskId: string, newTask: Task) {
      const items = findTaskIndex(this.boards, boardId, listId, taskId)!;
      if (items) {
        const { taskIndex, list } = items;
        list.tasks[taskIndex] = newTask;
      }
    },

    rearrangeTask(
      boardId: string,
      listId: string,
      taskId: string,
      newIndex: number
    ) {
      const items = findTaskIndex(this.boards, boardId, listId, taskId);

      if (items) {
        const { list, taskIndex } = items;
        if (newIndex < 0 || newIndex >= list.tasks.length) {
          return;
        }
        const [task] = list.tasks.splice(taskIndex, 1);
        list.tasks.splice(newIndex, 0, task);
      }
    },

    rearrangeTaskToList(
      boardId: string,
      listId: string,
      taskId: string,
      newListId: string,
      newIndex: number
    ) {
      const taskItem = findTaskIndex(this.boards, boardId, listId, taskId)!;

      const listItem = findListIndex(this.boards, boardId, newListId);

      if (taskItem && listItem) {
        const list = listItem.board.lists[listItem.listIndex];
        // dont' use >= so that we can push an element at the end of a list
        if (newIndex < 0 || newIndex > list.tasks.length) {
          return;
        }
        const [task] = taskItem.list.tasks.splice(taskItem.taskIndex, 1);
        list.tasks.splice(newIndex, 0, task);
      }
    },

    addList(boardId: string, list: Omit<List, "id" | "tasks">) {
      const board = this.boards.find(({ id }) => boardId === id);
      if (board) {
        const newList: List = {
          ...list,
          id: nanoid(),
          tasks: [],
        };
        board.lists.push(newList);
        return newList;
      }
      return undefined;
    },

    removeList(boardId: string, listId: string) {
      const items = findListIndex(this.boards, boardId, listId);

      if (items) {
        const { listIndex, board } = items;
        board.lists.splice(listIndex, 1);
      }
    },

    changeList(boardId: string, newList: List) {
      const items = findListIndex(this.boards, boardId, newList.id);
      if (items) {
        const { listIndex, board } = items;
        board.lists.splice(listIndex, 1);
        board.lists[listIndex] = newList;
      }
    },

    addBoard(board: Omit<Board, "id" | "lists">) {
      const newBoard: Board = {
        ...board,
        id: nanoid(),
        lists: [],
      };
      this.boards.push(newBoard);
      return newBoard;
    },

    removeBoard(boardId: string) {
      const index = this.boards.findIndex(({ id }) => boardId === id);
      if (index !== -1) {
        this.boards.splice(index, 1);
      }
    },

    changeBoard(board: Board) {
      const index = this.boards.findIndex(({ id }) => board.id === id);
      if (index !== -1) {
        this.boards[index] = board;
      }
    },
  },
});

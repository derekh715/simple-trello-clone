import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { Board, List, Task, useKanbanStore } from "./kanban";

const expectedBoard: Omit<Board, "id" | "lists" | "created"> = {
  description: "hello world",
  name: "hello",
};

function createBoard(kanban: ReturnType<typeof useKanbanStore>) {
  return kanban.addBoard(expectedBoard);
}

const expectedList: Omit<List, "id" | "tasks" | "created"> = {
  description: "hello list",
  name: "list",
};

function createList(kanban: ReturnType<typeof useKanbanStore>, board: Board) {
  return kanban.addList(board.id, expectedList);
}

const expectedTask: Omit<Task, "id" | "created"> = {
  name: "task",
  status: "unfinished",
  description: "hello task",
};

describe("boards", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should add a new board", () => {
    const kanban = useKanbanStore();
    createBoard(kanban);
    expect(kanban.boards).toHaveLength(1);
    expect(kanban.boards[0].description).toBe(expectedBoard.description);
    expect(kanban.boards[0].name).toBe(expectedBoard.name);
    expect(kanban.boards[0].lists).toEqual([]);
    expect(kanban.boards[0].id).toBeDefined();
  });

  it("should remove board", () => {
    const kanban = useKanbanStore();
    const newBoard = createBoard(kanban);
    kanban.removeBoard(newBoard.id);
    expect(kanban.boards).toHaveLength(0);
  });

  it("should change board", () => {
    const kanban = useKanbanStore();
    let newBoard = createBoard(kanban);
    newBoard = { ...newBoard, name: "changed" };
    kanban.changeBoard(newBoard);
    expect(kanban.boards[0].name).toBe("changed");
  });
});

describe("list", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should add a new list", () => {
    const kanban = useKanbanStore();
    const newBoard = createBoard(kanban);
    // createList returns a reference to the list inside newBoard
    createList(kanban, newBoard);
    expect(kanban.boards[0].lists).toHaveLength(1);
    expect(kanban.boards[0].lists[0].description).toBe(
      expectedList.description
    );
    expect(kanban.boards[0].lists[0].name).toBe(expectedList.name);
    expect(kanban.boards[0].lists[0].tasks).toEqual([]);
    expect(kanban.boards[0].lists[0].id).toBeDefined();
  });

  it("should remove list", () => {
    const kanban = useKanbanStore();
    const newBoard = createBoard(kanban);
    const newList = createList(kanban, newBoard);
    kanban.removeList(newBoard.id, newList!.id);
    expect(kanban.boards[0].lists).toHaveLength(0);
  });

  it("should change list", () => {
    const kanban = useKanbanStore();
    const newBoard = createBoard(kanban);
    const newList = createList(kanban, newBoard)!;
    createList(kanban, newBoard);
    createList(kanban, newBoard);
    const changedList: List = { ...newList, name: "changed" };
    kanban.changeList(newBoard.id, changedList);
    expect(kanban.boards[0].lists[0].name).toBe("changed");
  });
});

describe("tasks", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  function getList(kanban: ReturnType<typeof useKanbanStore>) {
    const newBoard = createBoard(kanban);
    createList(kanban, newBoard);
    return { list: kanban.boards[0].lists[0], board: kanban.boards[0] };
  }

  it("should add a new task", () => {
    const kanban = useKanbanStore();
    const { list, board } = getList(kanban);
    kanban.addTask(board.id, list.id, expectedTask);
    expect(kanban.boards[0].lists[0].tasks).toHaveLength(1);
    expect(kanban.boards[0].lists[0].tasks[0].description).toBe(
      expectedTask.description
    );
    expect(kanban.boards[0].lists[0].tasks[0].name).toBe(expectedTask.name);
  });

  it("should remove task", () => {
    const kanban = useKanbanStore();
    const newBoard = createBoard(kanban)!;
    const newList = createList(kanban, newBoard)!;
    const task = kanban.addTask(newBoard.id, newList.id, expectedTask)!;
    kanban.removeTask(newBoard.id, newList.id, task.id);
    expect(kanban.boards[0].lists[0].tasks).toHaveLength(0);
  });

  it("should change task", () => {
    const kanban = useKanbanStore();
    const newBoard = createBoard(kanban);
    const newList = createList(kanban, newBoard)!;
    const newTask = kanban.addTask(newBoard.id, newList.id, expectedTask)!;
    const changedTask: Task = { ...newTask, name: "changed" };
    kanban.changeTask(newBoard.id, newList.id, changedTask);
    expect(kanban.boards[0].lists[0].tasks[0].name).toBe("changed");
  });

  it("should rearrange tasks", () => {
    const kanban = useKanbanStore();
    const { list, board } = getList(kanban);
    const task = kanban.addTask(board.id, list.id, {
      name: "1",
      status: "finished",
      description: "",
    })!;
    kanban.addTask(board.id, list.id, {
      name: "2",
      status: "finished",
      description: "",
    });
    expect(kanban.boards[0].lists[0].tasks).toHaveLength(2);
    // move the first task to be behind the second task
    kanban.rearrangeTask(board.id, list.id, task.id, 1);
    // now the second task becomes the first task
    expect(kanban.boards[0].lists[0].tasks[0].name).toBe("2");
  });

  it("should rearrange tasks with more items", () => {
    const kanban = useKanbanStore();
    const { list, board } = getList(kanban);
    for (let i = 0; i < 10; i++) {
      kanban.addTask(board.id, list.id, {
        name: "placeholder",
        status: "finished",
        description: "",
      });
    }
    const task = kanban.addTask(board.id, list.id, {
      name: "1",
      status: "finished",
      description: "",
    })!;
    expect(kanban.boards[0].lists[0].tasks).toHaveLength(11);
    for (let i = 0; i <= 10; i++) {
      kanban.rearrangeTask(board.id, list.id, task.id, i);
      expect(kanban.boards[0].lists[0].tasks[i].name).toBe("1");
    }
  });

  it("should move task to a new list", () => {
    const kanban = useKanbanStore();
    const board = kanban.addBoard({ description: "", name: "" });
    const l1 = kanban.addList(board.id, { description: "", name: "1" })!;
    for (let i = 0; i < 20; i++) {
      kanban.addTask(board.id, l1.id, {
        name: `Task #${i} on List 1`,
        status: "finished",
        description: "",
      });
    }

    const l2 = kanban.addList(board.id, { description: "", name: "2" })!;
    const task = kanban.addTask(board.id, l2.id, {
      name: "okay",
      status: "finished",
      description: "",
    })!;

    // try moving item on list2 to different places in list1
    for (let i = 0; i < 20; i++) {
      kanban.rearrangeTaskToList(board.id, l2.id, task.id, l1.id, i);
      expect(kanban.boards[0].lists[0].tasks[i]).toEqual(task);
      kanban.rearrangeTaskToList(board.id, l1.id, task.id, l2.id, 0);
    }

    // now try moving all items on list1 to list2
    const taskIds = [task.id];
    const tasks = [...kanban.boards[0].lists[0].tasks];
    for (let i = 0; i < tasks.length; i++) {
      let taskId = tasks[i].id;
      taskIds.push(taskId);
      kanban.rearrangeTaskToList(board.id, l1.id, taskId, l2.id, 0);
    }
    const list1Ids = kanban.boards[0].lists[1].tasks.map((task) => task.id);
    expect(list1Ids.reverse()).toEqual(taskIds);
  });
});

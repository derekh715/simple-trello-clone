import EditTask from "@/components/task/EditTask.vue";
import { useKanbanStore } from "@/store/kanban";
import { renderWith } from "@/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { fireEvent, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";

describe("EditTask", () => {
  const board = {
    name: "board",
    id: "board",
    description: "test desc",
    lists: [
      {
        name: "list",
        id: "list",
        description: "test list",
        tasks: [
          {
            name: "task",
            id: "task",
            description: "",
            status: "unfinished",
          },
        ],
      },
    ],
  };

  async function wrap() {
    const router = createRouter({
      routes,
      history: createMemoryHistory(),
    });
    router.push(`/boards/${board.id}`);
    await router.isReady();

    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [board],
      },
    });
    const screen = renderWith(EditTask, [piniaPlugin, router], {
      listId: board.lists[0].id,
      task: board.lists[0].tasks[0],
    });
    const icon = screen.getByRole("img", { name: /edit/i });
    await fireEvent.click(icon);
    return screen;
  }

  it("should change task if name is valid", async () => {
    const screen = await wrap();
    const input = screen.getByLabelText(/name/i);
    const expected = "Expected Task Name";
    await fireEvent.update(input, expected);
    const doneBtn = screen.getByText(/done/i);
    await fireEvent.click(doneBtn);
    const kanban = useKanbanStore();
    await waitFor(() => {
      expect(kanban.changeTask).toBeCalledWith("board", "list", {
        ...board.lists[0].tasks[0],
        name: expected,
      });
    });
  });

  it("should not change task if name is invalid", async () => {
    const screen = await wrap();
    const input = screen.getByLabelText(/name/i);
    // empty string is invalid
    await fireEvent.update(input, "");
    const doneBtn = screen.getByText(/done/i);
    await fireEvent.click(doneBtn);
    const warningText = screen.getByText(/empty/i);
    const kanban = useKanbanStore();
    expect(kanban.changeTask).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });

  it("should not change task if name is too long", async () => {
    const screen = await wrap();
    const input = screen.getByLabelText(/name/i);
    // string is too long
    await fireEvent.update(input, "l".repeat(300));
    const doneBtn = screen.getByText(/done/i);
    await fireEvent.click(doneBtn);
    const warningText = screen.getByText(/characters/i);
    const kanban = useKanbanStore();
    expect(kanban.changeTask).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });
});

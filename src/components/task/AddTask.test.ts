import { useKanbanStore } from "@/store/kanban";
import { renderWith } from "@/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { fireEvent, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";
import AddTask from "./AddTask.vue";

describe("AddTask", () => {
  const expectedTask = {
    name: "test task",
    description: "test task",
    status: "unfinished",
  };

  async function wrap() {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    router.push("/boards/board");
    await router.isReady();
    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [
          {
            name: "test board",
            id: "board",
            lists: [
              {
                name: "test list",
                id: "list",
              },
            ],
            description: "",
          },
        ],
      },
    });

    const screen = renderWith(AddTask, [piniaPlugin, router], {
      list: {
        id: "list",
      },
    });
    const button = screen.getByText(/add/i);
    await fireEvent.click(button);

    return screen;
  }

  it("should add task if inputs are valid", async () => {
    const screen = await wrap();
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, expectedTask.name);
    const description = screen.getByLabelText(/description/i);
    await fireEvent.update(description, expectedTask.description);
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const kanban = useKanbanStore();
    await waitFor(() => {
      expect(kanban.addTask).toHaveBeenCalledWith(
        "board",
        "list",
        expectedTask
      );
    });
  });

  it("should not add task if inputs are invalid", async () => {
    const screen = await wrap();
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, "");
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const warningText = screen.getByText(/empty/i);
    const kanban = useKanbanStore();
    expect(kanban.addTask).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });

  it("should not add task if inputs are too long", async () => {
    const screen = await wrap();
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, "l".repeat(300));
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const warningText = screen.getByText(/characters/i);
    const kanban = useKanbanStore();
    expect(kanban.addTask).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });
});

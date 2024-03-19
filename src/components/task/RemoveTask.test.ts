import RemoveTask from "@/components/task/RemoveTask.vue";
import { useKanbanStore } from "@/store/kanban";
import { renderWith } from "@/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { fireEvent, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";

describe("RemoveTask", () => {
  const board = {
    name: "board",
    id: "board",
    description: "test desc",
    lists: [
      {
        name: "list",
        id: "list",
        tasks: [
          {
            name: "task",
            id: "task",
          },
        ],
      },
    ],
  };

  it("should remove task when confirmed", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    router.push(`/boards/${board.id}`);
    await router.isReady();
    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [board],
      },
    });
    const screen = renderWith(RemoveTask, [piniaPlugin, router], {
      listId: board.lists[0].id,
      task: board.lists[0].tasks[0],
    });
    const icon = screen.getByRole("img", { name: /remove/i });
    await fireEvent.click(icon);
    const kanban = useKanbanStore();
    await waitFor(() => {
      expect(kanban.removeTask).toBeCalledWith(
        board.id,
        board.lists[0].id,
        board.lists[0].tasks[0].id
      );
    });
  });
});

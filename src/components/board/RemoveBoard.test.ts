import RemoveBoard from "@/components/board/RemoveBoard.vue";
import { useKanbanStore } from "@/store/kanban";
import { renderWith } from "@/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { fireEvent, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";

describe("remove board", () => {
  const board = {
    name: "test",
    id: "test",
    description: "test desc",
    lists: [],
  };

  it("should remove board when confirmed", async () => {
    let path = "";
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    router.beforeEach((guard) => {
      path = guard.fullPath;
    });

    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [board],
      },
    });
    const screen = renderWith(RemoveBoard, [piniaPlugin, router], { board });
    const button = screen.getByText(/remove/i);
    await fireEvent.click(button);
    const btn = screen.getByText(/confirm/i);
    await fireEvent.click(btn);
    const kanban = useKanbanStore();
    await waitFor(() => {
      expect(kanban.removeBoard).toBeCalledWith(board.id);
      expect(path).toBe("/");
    });
  });
});

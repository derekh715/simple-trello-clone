import AddList from "@/components/list/AddList.vue";
import { useKanbanStore } from "@/store/kanban";
import { renderWith } from "@/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { fireEvent, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";

describe("AddList", () => {
  const expectedList = {
    name: "test list",
    description: "test list",
  };

  async function wrap() {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    router.push("/boards/test");
    await router.isReady();
    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [
          {
            name: "test board",
            id: "test",
            lists: [],
            description: "",
          },
        ],
      },
    });

    const screen = renderWith(AddList, [piniaPlugin, router]);
    const button = screen.getByText(/add/i);
    await fireEvent.click(button);

    return screen;
  }

  it("should add list if inputs are valid", async () => {
    const screen = await wrap();
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, expectedList.name);
    const description = screen.getByLabelText(/description/i);
    await fireEvent.update(description, expectedList.description);
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const kanban = useKanbanStore();
    await waitFor(() => {
      expect(kanban.addList).toHaveBeenCalledWith("test", expectedList);
    });
  });

  it("should not add list if inputs are invalid", async () => {
    const screen = await wrap();
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, "");
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const warningText = screen.getByText(/empty/i);
    const kanban = useKanbanStore();
    expect(kanban.addList).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });

  it("should not add board if inputs are too long", async () => {
    const screen = await wrap();
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(
      name,
      "looooooooooooooooooooooooooooooooooooooooong"
    );
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const warningText = screen.getByText(/characters/i);
    const kanban = useKanbanStore();
    expect(kanban.addList).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });
});

import AddBoard from "@/components/board/AddBoard.vue";
import { useKanbanStore } from "@/store/kanban";
import { renderWith } from "@/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { fireEvent, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";

describe("AddBoard", () => {
  const expectedBoard = {
    name: "test",
    description: "test",
  };

  it("should add board if inputs are valid", async () => {
    const piniaPlugin = createTestingPinia({
      initialState: { boards: [] },
    });
    const screen = renderWith(AddBoard, [piniaPlugin]);
    const button = screen.getByText(/add/i);
    await fireEvent.click(button);
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, expectedBoard.name);
    const description = screen.getByLabelText(/description/i);
    await fireEvent.update(description, expectedBoard.description);
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const kanban = useKanbanStore();
    await waitFor(() => {
      expect(kanban.addBoard).toBeCalledWith(expectedBoard);
    });
  });

  it("should not add board if inputs are invalid", async () => {
    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [],
      },
    });
    const screen = renderWith(AddBoard, [piniaPlugin]);
    const button = screen.getByText(/add/i);
    await fireEvent.click(button);
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, "");
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const warningText = screen.getByText(/empty/i);
    const kanban = useKanbanStore();
    expect(kanban.addBoard).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });

  it("should not add board if inputs are too long", async () => {
    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [],
      },
    });
    const screen = renderWith(AddBoard, [piniaPlugin]);
    const button = screen.getByText(/add/i);
    await fireEvent.click(button);
    const name = screen.getByLabelText(/name/i);
    await fireEvent.update(name, "l".repeat(300));
    const btn = screen.getByText(/done/i);
    await fireEvent.click(btn);
    const warningText = screen.getByText(/characters/i);
    const kanban = useKanbanStore();
    expect(kanban.addBoard).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });
});

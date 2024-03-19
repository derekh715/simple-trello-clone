import EditBoard from "@/components/board/EditBoard.vue";
import { useKanbanStore } from "@/store/kanban";
import { renderWith } from "@/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { fireEvent, waitFor } from "@testing-library/vue";
import { describe, expect, it } from "vitest";

describe("edit board", () => {
  const board = {
    name: "test",
    id: "test",
    description: "test desc",
    lists: [],
  };

  async function wrap() {
    const piniaPlugin = createTestingPinia({
      initialState: {
        boards: [board],
      },
    });
    const screen = renderWith(EditBoard, [piniaPlugin], { board });
    const button = screen.getByText(/edit/i);
    await fireEvent.click(button);
    return screen;
  }

  it("should change board if name is valid", async () => {
    const screen = await wrap();
    const input = screen.getByLabelText(/name/i);
    const expected = "Expected Board Name";
    await fireEvent.update(input, expected);
    const doneBtn = screen.getByText(/done/i);
    await fireEvent.click(doneBtn);
    const kanban = useKanbanStore();
    await waitFor(() => {
      expect(kanban.changeBoard).toBeCalledWith({ ...board, name: expected });
    });
  });

  it("should not change board if name is invalid", async () => {
    const screen = await wrap();
    const input = screen.getByLabelText(/name/i);
    // empty string is invalid
    await fireEvent.update(input, "");
    const doneBtn = screen.getByText(/done/i);
    await fireEvent.click(doneBtn);
    const warningText = screen.getByText(/empty/i);
    const kanban = useKanbanStore();
    expect(kanban.changeBoard).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });

  it("should not change board if name is too long", async () => {
    const screen = await wrap();
    const input = screen.getByLabelText(/name/i);
    // looooooooooong string is invalid
    await fireEvent.update(
      input,
      "loooooooooooooooooooooooooooooooooooooooong"
    );
    const doneBtn = screen.getByText(/done/i);
    await fireEvent.click(doneBtn);
    const warningText = screen.getByText(/characters/i);
    const kanban = useKanbanStore();
    expect(kanban.changeBoard).not.toHaveBeenCalled();
    expect(warningText).toBeTruthy();
  });
});

import { renderWith } from "@/test-utils";
import { fireEvent } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "vue-router/auto-routes";
import BoardCard from "./BoardCard.vue";

describe("Board", () => {
  it("clicking on the board switches to new page", async () => {
    let path = "";
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    router.beforeEach((guard) => {
      path = guard.fullPath;
    });

    const screen = renderWith(BoardCard, [router], {
      board: {
        name: "Test Board",
        id: "test-id",
      },
    });

    const card = screen.getByText("Test Board");
    await fireEvent.click(card);
    await router.isReady();
    expect(path).toBe("/boards/test-id");
  });
});

<template>
  <div v-if="board">
    <Board :board="board" />
  </div>
  <div v-else>
    <h1>Sorry! This board does not exist!</h1>
  </div>
</template>

<script setup lang="ts">
import { Board as BoardType, useKanbanStore } from "@/store/kanban";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

function findBoard(newId: string): BoardType | undefined {
  return kanban.boards.find(({ id }) => newId === id);
}

const route = useRoute();
const kanban = useKanbanStore();
const board = ref<BoardType | undefined>(findBoard(route.params.id as string));

// vue reuses the same component if the id changes
watch(
  () => route.params.id,
  (newId, _) => {
    board.value = findBoard(newId as string);
  }
);
</script>

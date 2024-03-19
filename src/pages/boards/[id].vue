<template>
  <div v-if="board">
    <Board :board="board" />
  </div>
  <div v-else class="d-flex justify-center align-center h-75">
    <h1 class="text-h5">Sorry! This board does not exist!</h1>
  </div>
</template>

<script setup lang="ts">
import { useKanbanStore } from "@/store/kanban";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const kanban = useKanbanStore();
const board = computed(() => kanban.getBoard(route.params.id as string));
</script>

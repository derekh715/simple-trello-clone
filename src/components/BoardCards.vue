<template>
  <v-container>
    <v-row>
      <v-col v-for="board in boards" cols="4">
        <BoardCard :board="board" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useKanbanStore } from "@/store/kanban";
import { storeToRefs } from "pinia";

const kanban = useKanbanStore();
const { boards } = storeToRefs(kanban);
</script>

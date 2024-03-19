<template>
  <v-container class="position-relative mt-4">
    <div class="text-h4 font-weight-bold">
      <div class="d-flex align-center ga-2 mb-8">
        <v-icon
          class="cursor-pointer"
          color="on-background"
          size="34"
          @click="router.push('/')"
          >mdi-arrow-left</v-icon
        >
        <span>
          {{ board.name }}
        </span>
      </div>
    </div>

    <p class="text-white my-4 text-h6">{{ board.description }}</p>

    <v-row>
      <v-col v-for="list in board.lists" cols="4">
        <List :list="list" />
      </v-col>
      <v-col cols="4">
        <AddList />
      </v-col>
    </v-row>

    <v-row class="position-absolute right-0 top-0 d-flex">
      <EditBoard :board="board" />
      <RemoveBoard :board="board" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Board } from "@/store/kanban";
import { useRouter } from "vue-router";

defineProps<{ board: Board }>();
const router = useRouter();
</script>

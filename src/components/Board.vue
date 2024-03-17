<template>
  <v-container>
    <div class="text-h4 my-4 font-weight-bold">
      <div class="d-flex align-center ga-2">
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

    <v-row>
      <v-col v-for="list in board.lists" cols="4">
        <List :list="list" />
      </v-col>
      <v-col>
        <v-btn flat ripple prepend-icon="mdi-plus">Add New List</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Board } from "@/store/kanban";
import { useRouter } from "vue-router";

const props = defineProps<{ board: Board }>();
const router = useRouter();
</script>

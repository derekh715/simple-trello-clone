<template>
  <v-container>
    <h1 class="my-5">{{ board.name }}</h1>

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

const props = defineProps<{ board: Board }>();
</script>

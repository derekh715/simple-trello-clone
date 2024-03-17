<template>
  <v-container>
    <v-card>
      <v-card-title>{{ board.name }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { Board } from "@/store/kanban";

defineProps<{ board: Board }>();
</script>

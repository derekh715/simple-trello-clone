<template>
  <v-card flat>
    <v-row align="center">
      <v-col cols="9">
        <v-card-text>
          <h3>{{ task.name }}</h3>
          <p>{{ task.description }}</p>
        </v-card-text>
      </v-col>
      <v-col cols="3">
        <v-row justify="space-around" dense>
          <v-icon icon="mdi-trash-can" class="pointer-cursor"></v-icon>
          <v-icon icon="mdi-pencil" class="pointer-cursor"></v-icon>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { Task } from "@/store/kanban";

defineProps<{ task: Task; listId: string }>();
</script>

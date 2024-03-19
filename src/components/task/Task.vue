<template>
  <v-card flat class="py-2">
    <v-row align="center">
      <v-col cols="8">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
      </v-col>
      <v-col cols="4">
        <div class="d-flex ga-3 justify-end items-center">
          <EditTask :task="task" :listId="listId" />
          <RemoveTask :task="task" :listId="listId" />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { Task } from "@/store/kanban";

defineProps<{ task: Task; listId: string }>();
</script>

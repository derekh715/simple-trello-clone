<template>
  <v-card tonal>
    <v-card-title class="mb-4 mt-2">
      <div class="d-flex justify-space-between align-center">
        <span>
          {{ list.name }}
        </span>
        <div class="d-flex justify-end align-center ga-4">
          <EditList :list="list" />
          <RemoveList :list="list" />
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <v-row dense>
        <v-col v-for="task in list.tasks" cols="12">
          <Task :task="task" :listId="list.id" />
        </v-col>
      </v-row>

      <AddTask :list="list" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { List } from "@/store/kanban";

defineProps<{ list: List }>();
</script>

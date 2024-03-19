<template>
  <v-card tonal>
    <v-card-title>{{ list.name }}</v-card-title>

    <v-row dense class="mx-2">
      <v-col v-for="task in list.tasks" cols="12">
        <Task :task="task" :listId="list.id" />
      </v-col>
    </v-row>

    <AddTask :list="list" />
  </v-card>
</template>

<script setup lang="ts">
import { List } from "@/store/kanban";

defineProps<{ list: List }>();
</script>

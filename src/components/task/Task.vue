<template>
  <v-card flat class="py-2">
    <v-row align="center">
      <v-col cols="8">
        <div class="d-flex ga-4 align-center">
          <v-icon :icon="icon.icon" :color="icon.color"></v-icon>
          <div>
            <h3 class="text-body1">{{ task.name }}</h3>
            <p class="text-body2">{{ task.description }}</p>
            <p class="text-caption">{{ format(task.created, "dd-MM-yyyy") }}</p>
          </div>
        </div>
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
import { format } from "date-fns";
import { computed } from "vue";

const props = defineProps<{ task: Task; listId: string }>();

const icon = computed(() => {
  switch (props.task.status) {
    case "finished":
      return { icon: "mdi-check", color: "green" };
    case "unfinished":
      return { icon: "mdi-progress-helper", color: "" };
    case "suspended":
      return { icon: "mdi-stop", color: "red" };
  }
});
</script>

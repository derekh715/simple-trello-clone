<template>
  <v-icon
    icon="mdi-trash-can"
    class="pointer-cursor"
    @click="removeTask"
    aria-label="remove task"
    aria-hidden="false"
    role="img"
  ></v-icon>
</template>

<script lang="ts" setup>
import { Task, useKanbanStore } from "@/store/kanban";
import { useRoute } from "vue-router";

const kanban = useKanbanStore();
const route = useRoute();

const props = defineProps<{ listId: string; task: Task }>();

function removeTask() {
  kanban.removeTask(route.params.id as string, props.listId, props.task.id);
}
</script>

<template>
  <v-icon
    icon="mdi-trash-can"
    @click="removeList"
    aria-label="remove list"
    aria-hidden="false"
    role="img"
  ></v-icon>
</template>

<script lang="ts" setup>
import { List, useKanbanStore } from "@/store/kanban";
import { useRoute } from "vue-router";

const kanban = useKanbanStore();
const route = useRoute();

const props = defineProps<{ list: List }>();

function removeList() {
  kanban.removeList(route.params.id as string, props.list.id);
}
</script>

<template>
  <v-card @click="navigateToBoard">
    <v-card-title>{{ board.name }}</v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { Board } from "@/store/kanban";
import { useRouter } from "vue-router";

const props = defineProps<{ board: Board }>();

const router = useRouter();

function navigateToBoard() {
  router.push({ path: `/boards/${props.board.id}` });
}
</script>

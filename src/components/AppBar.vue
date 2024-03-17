<template>
  <v-app-bar flat dense color="blue-darken-2">
    <v-app-bar-title class="font-bold cursor-pointer" @click="router.push('/')"
      >Trello Clone</v-app-bar-title
    >
    <v-btn icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-btn icon class="me-4">
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Add New List"
      prepend-icon="mdi-note"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-text-field
        label="Name of List"
        variant="outlined"
        v-model="nameModel"
      ></v-text-field>
      <v-textarea
        label="Description of List"
        variant="outlined"
        v-model="descModel"
      ></v-textarea>
      <v-card-actions>
        <v-btn color="primary" variant="outlined" block @click="addNewList"
          >Done</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-col cols="4">
    <v-card
      link
      prepend-icon="mdi-plus"
      title="Add New List"
      @click="dialog = true"
    ></v-card>
  </v-col>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref(false);
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });

function addNewList() {
  dialog.value = false;
  // TODO: finish this line
}
</script>

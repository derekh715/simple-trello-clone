<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Add New Board"
      prepend-icon="mdi-note"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-text-field
        label="Name of Board"
        variant="outlined"
        v-model="nameModel"
      ></v-text-field>
      <v-textarea
        label="Description of Board"
        variant="outlined"
        v-model="descModel"
      ></v-textarea>
      <v-card-actions>
        <v-btn color="primary" variant="outlined" block @click="addNewBoard"
          >Done</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-col cols="4">
    <v-card
      link
      prepend-icon="mdi-plus"
      title="Add New Board"
      @click="dialog = true"
    ></v-card>
  </v-col>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref(false);
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });

function addNewBoard() {
  dialog.value = false;
  // TODO: finish this line
}
</script>

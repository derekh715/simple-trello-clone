<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Add New Board"
      prepend-icon="mdi-note"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-form @submit.prevent="addNewBoard">
        <v-text-field
          label="Name of Board"
          variant="outlined"
          v-model="nameModel"
          maxlength="30"
          :rules="[rules.required, rules.max(30)]"
          class="my-4"
        ></v-text-field>
        <v-textarea
          label="Description of Board"
          variant="outlined"
          v-model="descModel"
        ></v-textarea>
        <v-card-actions>
          <v-btn color="primary" variant="outlined" block type="submit"
            >Done</v-btn
          >
        </v-card-actions>
      </v-form>
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
import { useKanbanStore } from "@/store/kanban";
import { rules } from "@/utils/form";
import { ref } from "vue";
import { SubmitEventPromise } from "vuetify";

const dialog = ref(false);
const store = useKanbanStore();
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });

async function addNewBoard(event: SubmitEventPromise) {
  const result = await event;
  if (!result.valid) {
    return false;
  }

  dialog.value = false;
  store.addBoard({ description: descModel.value, name: nameModel.value });
}
</script>

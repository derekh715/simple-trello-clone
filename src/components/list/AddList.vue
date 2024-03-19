<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Add New List"
      prepend-icon="mdi-note"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-card-text>
        <v-form @submit.prevent="addNewList">
          <v-text-field
            label="Name of List"
            variant="outlined"
            v-model="nameModel"
            :rules="[rules.required, rules.max(30)]"
            maxlength="30"
            class="my-4"
          ></v-text-field>
          <v-textarea
            label="Description of List"
            variant="outlined"
            v-model="descModel"
          ></v-textarea>
          <v-card-actions>
            <v-btn color="primary" variant="outlined" block type="submit"
              >Done</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
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
import { useKanbanStore } from "@/store/kanban";
import { rules } from "@/utils/form";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { SubmitEventPromise } from "vuetify";

const store = useKanbanStore();
const dialog = ref(false);
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });
const route = useRoute();

async function addNewList(event: SubmitEventPromise) {
  const result = await event;
  if (!result.valid) {
    return;
  }
  dialog.value = false;
  store.addList(route.params.id as string, {
    description: descModel.value,
    name: nameModel.value,
  });
}
</script>

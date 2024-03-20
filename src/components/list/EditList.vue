<template>
  <v-icon
    icon="mdi-pencil"
    aria-hidden="false"
    aria-label="edit list"
    role="img"
    class="cursor-pointer"
    @click="dialog = true"
  >
  </v-icon>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Edit List"
      prepend-icon="mdi-note"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-form @submit.prevent="editList">
        <v-text-field
          label="Name of List"
          variant="outlined"
          maxlength="30"
          :rules="[rules.required, rules.max()]"
          v-model="nameModel"
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
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { List, useKanbanStore } from "@/store/kanban";
import { rules } from "@/utils/form";
import clone from "clone";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { SubmitEventPromise } from "vuetify";

const props = defineProps<{ list: List }>();
const route = useRoute();
const store = useKanbanStore();

const dialog = ref(false);
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });

nameModel.value = props.list.name;
descModel.value = props.list.description;

async function editList(event: SubmitEventPromise) {
  const result = await event;

  if (!result.valid) {
    return;
  }

  const clonedList = clone(props.list);
  store.changeList(route.params.id as string, {
    ...clonedList,
    description: descModel.value,
    name: nameModel.value,
  });
  dialog.value = false;
}
</script>

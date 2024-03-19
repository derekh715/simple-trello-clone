<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Edit Board"
      prepend-icon="mdi-note"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-form @submit.prevent="editBoard">
        <v-text-field
          label="Name of Board"
          variant="outlined"
          maxlength="30"
          :rules="[rules.required, rules.max(30)]"
          v-model="nameModel"
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
  <v-col>
    <v-btn color="secondary" prepend-icon="mdi-note-edit" @click="dialog = true"
      >Edit Board Name & Description</v-btn
    >
  </v-col>
</template>

<script setup lang="ts">
import { Board, useKanbanStore } from "@/store/kanban";
import { rules } from "@/utils/form";
import clone from "clone";
import { ref } from "vue";
import { SubmitEventPromise } from "vuetify";

const props = defineProps<{ board: Board }>();
const store = useKanbanStore();

const dialog = ref(false);
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });

nameModel.value = props.board.name;
descModel.value = props.board.description;

async function editBoard(event: SubmitEventPromise) {
  const result = await event;

  if (!result.valid) {
    return;
  }

  const clonedBoard = clone(props.board);
  store.changeBoard({
    ...clonedBoard,
    description: descModel.value,
    name: nameModel.value,
  });
  dialog.value = false;
}
</script>

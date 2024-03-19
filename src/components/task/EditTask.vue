<template>
  <v-icon
    icon="mdi-pencil"
    class="cursor-pointer"
    aria-label="edit task"
    aria-hidden="false"
    role="img"
    @click="dialog = true"
  ></v-icon>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Edit Task"
      prepend-icon="mdi-note"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-card-text>
        <v-form @submit.prevent="addNewTask">
          <v-text-field
            label="Name of Task"
            variant="outlined"
            v-model="nameModel"
            :rules="[rules.required, rules.max(30)]"
            class="my-4"
          ></v-text-field>
          <v-textarea
            label="Description of Task"
            variant="outlined"
            v-model="descModel"
            class="my-4"
          ></v-textarea>
          <v-combobox
            label="Status"
            :items="['unfinished', 'suspended', 'finished']"
            :rules="[rules.required]"
            v-model="statusModel"
          >
          </v-combobox>
          <v-card-actions>
            <v-btn color="primary" variant="outlined" block type="submit"
              >Done</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { Status, Task, useKanbanStore } from "@/store/kanban";
import { rules } from "@/utils/form";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { SubmitEventPromise } from "vuetify";

const props = defineProps<{ listId: string; task: Task }>();

const dialog = ref(false);
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });
const statusModel = defineModel("status", { default: "unfinished" });
const route = useRoute();
const kanban = useKanbanStore();

nameModel.value = props.task.name;
descModel.value = props.task.description || "";
statusModel.value = props.task.status;

async function addNewTask(event: SubmitEventPromise) {
  const result = await event;
  if (!result.valid) {
    return;
  }
  kanban.changeTask(route.params.id as string, props.listId, {
    ...props.task,
    name: nameModel.value,
    description: descModel.value,
    status: statusModel.value as Status,
  });
  dialog.value = false;
}
</script>

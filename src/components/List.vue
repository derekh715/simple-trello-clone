<template>
  <v-card tonal>
    <v-card-title>{{ list.name }}</v-card-title>

    <v-row dense class="mx-2">
      <v-col v-for="task in list.tasks" cols="12">
        <Task :task="task" :listId="list.id" />
      </v-col>
    </v-row>

    <v-btn
      variant="plain"
      class="mx-2"
      prepend-icon="mdi-plus"
      @click="dialog = true"
      >Add New Task</v-btn
    >
    <v-dialog v-model="dialog" width="auto">
      <v-card
        title="Add New Task"
        prepend-icon="mdi-note"
        class="px-5 py-8"
        min-width="400"
        max-width="450"
      >
        <v-text-field
          label="Name of Task"
          variant="outlined"
          v-model="nameModel"
        ></v-text-field>
        <v-textarea
          label="Description of Task"
          variant="outlined"
          v-model="descModel"
        ></v-textarea>
        <v-combobox
          label="Status"
          :items="['unfinished', 'suspended', 'finished']"
          v-model="statusModel"
        >
        </v-combobox>
        <v-card-actions>
          <v-btn color="primary" variant="outlined" block @click="addNewTask"
            >Done</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { List } from "@/store/kanban";
import { ref } from "vue";

defineProps<{ list: List }>();
const dialog = ref(false);
const nameModel = defineModel("name", { default: "" });
const descModel = defineModel("desc", { default: "" });
const statusModel = defineModel("status", { default: "" });

function addNewTask() {
  console.log(nameModel.value, descModel.value, statusModel.value);
  dialog.value = false;
}
</script>

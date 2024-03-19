<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      title="Remove Board"
      prepend-icon="mdi-trash-can"
      class="px-5 py-8"
      min-width="400"
      max-width="450"
    >
      <v-card-text>
        Do you really want to remove this board? This action is irreversible.
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" variant="outlined" block @click="removeBoard"
          >Confirm</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-col>
    <v-btn color="error" prepend-icon="mdi-trash-can" @click="dialog = true"
      >Remove Board</v-btn
    >
  </v-col>
</template>

<script setup lang="ts">
import { Board, useKanbanStore } from "@/store/kanban";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{ board: Board }>();
const router = useRouter();
const store = useKanbanStore();

const dialog = ref(false);

function removeBoard() {
  dialog.value = false;
  router.push("/");
  store.removeBoard(props.board.id);
}
</script>

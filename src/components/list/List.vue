<template>
  <v-card tonal>
    <v-card-title class="mt-2">
      <div class="d-flex justify-space-between align-center">
        <p class="text-h6">{{ list.name }}</p>
        <div class="d-flex justify-end align-center ga-4">
          <EditList :list="list" />
          <RemoveList :list="list" />
        </div>
      </div>
      <p class="text-caption mt-4 mb-1">{{ list.description }}</p>
    </v-card-title>

    <v-card-text>
      <div
        :data-listid="list.id"
        class="py-4 position-relative"
        @drop="onDragDrop"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="task in list.tasks"
          cols="12"
          :data-taskid="task.id"
          draggable="true"
          @dragstart="onDragStart"
        >
          <Task :task="task" :listId="list.id" class="task" />
        </div>
      </div>
      <AddTask :list="list" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { List, useKanbanStore } from "@/store/kanban";
import { useRoute } from "vue-router";

const kanban = useKanbanStore();
const route = useRoute();
const props = defineProps<{ list: List }>();

function onDragStart(event: DragEvent) {
  event.dataTransfer?.setData(
    "text/plain",
    JSON.stringify({
      taskId: (event.target as HTMLElement).dataset.taskid!,
      listId: props.list.id,
    })
  );
}

function getAbsoluteYOffset(elem: HTMLElement) {
  return elem.getBoundingClientRect().top + window.scrollY;
}

function onDragDrop(event: DragEvent) {
  if (!event.dataTransfer) {
    return;
  }
  const data: { taskId: string; listId: string } = JSON.parse(
    event.dataTransfer.getData("text/plain")
  );
  let toElement = event.target as HTMLDivElement;
  while (!toElement.dataset.listid) {
    toElement = toElement.parentElement as HTMLDivElement;
  }
  const elements = toElement.getElementsByClassName(
    "task"
  ) as HTMLCollectionOf<HTMLDivElement>;

  const targetOffset = event.pageY - getAbsoluteYOffset(toElement);

  let before = elements.length - 1;
  for (let i = 0; i < elements.length; i++) {
    if (targetOffset <= elements[i].offsetTop + 10) {
      before = i;
      break;
    }
  }
  if (before < 0) {
    before = 0;
  }

  if (toElement.dataset.listid === data.listId) {
    kanban.rearrangeTask(
      route.params.id as string,
      props.list.id,
      data.taskId,
      before
    );
  } else {
    kanban.rearrangeTaskToList(
      route.params.id as string,
      data.listId,
      data.taskId,
      toElement.dataset.listid,
      before
    );
  }
}
</script>

<template>
  <div class="container w-50">
    <div class="form-group w-50 m-3">
      <div class="d-flex justify-content-between">
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          v-model="newTask"
        />
        <button @click="handleCreate(newTask)" class="btn btn-outline-success" :disabled="newTask.length <= 0">Save</button>
      </div>
    </div>
    <div class="card m-2" v-for="task in taskStore.tasks" :key="task.id">
      <div class="card-body d-flex align-items-center justify-content-between">
        <div v-if="task.isEdit">
          <input type="text" v-model="task.name" :id="task.id" />
        </div>
        <div v-else>{{ task.name }}</div>
        <div>
          <!-- @click="handleChange(task.id, name)" -->
          <button
            v-if="task.isEdit"
            class="btn btn-outline-success mx-1"
            @click="handleChange(task)"
          >Save</button>
          <button
            v-else
            class="btn btn-outline-success mx-1"
            @click="task.isEdit = !task.isEdit"
          >Edit</button>
          <!-- End handleChange -->

          <!-- handleDelete -->
          <button class="btn btn-outline-danger mx-1" @click="handleDelete(task.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useTaskStore } from "@/store/TaskStore";
const taskStore = useTaskStore();
const newTask = ref("");
onMounted(() => {
  taskStore.getTasks();
});

function handleCreate(task){
  taskStore.addTask(task);
  newTask = '';
}
function handleChange(task) {
  taskStore.editTask(task.id, task.name);
  task.isEdit = false;
}
function handleDelete(id) {
  taskStore.deleteTask(id);
}
</script>
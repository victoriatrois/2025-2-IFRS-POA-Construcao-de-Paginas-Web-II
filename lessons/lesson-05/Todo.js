export default {
  name: "Todo",
  props: {
    listName: String,
    informationalText: {
      type: String,
      default: "Type and hit enter to add a new task",
    },
    tasks: Array,
    showHistory: Boolean,
    taskHistory: Array,
  },
  emits: ["task-added", "task-completed"],
  setup(props, { emit }) {
    const newTask = Vue.ref("");

    function getTodaysDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return day + "/" + month + "/" + year;
    }

    function createNewTask() {
      if (newTask.value.trim() !== "") {
        emit("task-added", {
          id: Date.now(),
          text: newTask.value,
        });
        newTask.value = "";
      }
    }

    function completeTask(task) {
      emit("task-completed", task);
    }

    return {
      newTask,
      getTodaysDate,
      createNewTask,
      completeTask,
    };
  },
  template: `
  <div>
    <h2>{{ listName }} ({{ getTodaysDate() }})</h2>
    <p v-if="informationalText">{{ informationalText }}</p>

    <input
      type="text"
      v-model="newTask"
      @change="createNewTask"
      id="newTask"
      style="width: 150px; margin-left: 5px"
    />

    <div style="margin: 10px 0 10px 0">
      Check a task to remove it from the list
    </div>

    <div v-for="(task, index) in tasks" :key="task.id">
      <label style="cursor: pointer">
        <input type="checkbox" @click="completeTask(task)" />
        {{ task.text }}
      </label>
    </div>

    <div v-if="showHistory && taskHistory.length > 0">
      <h2>Completed tasks</h2>
      <ul style="text-decoration: line-through">
        <li v-for="(taskText, index) in taskHistory" :key="index">{{ taskText }}</li>
      </ul>
    </div>
  </div>
  `,
};

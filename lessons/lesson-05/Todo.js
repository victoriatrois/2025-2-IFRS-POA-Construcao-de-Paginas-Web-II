export default {
  name: "Todo",
  props: {
    listName: String,
    informationalText: {
      type: String,
      default: "Type and hit enter to add a new task",
    },
    tasks: {
      type: Array,
      default: () => [],
      editing: {
        type: Boolean,
        default: false,
      },
    },
    showHistory: Boolean,
    taskHistory: Array,
  },
  emits: ["task-added", "task-completed", "task-deleted", "task-edited"],
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
          editing: false,
        });
        newTask.value = "";
      }
    }

    function completeTask(task) {
      emit("task-completed", task);
    }

    function editTask(task) {
      emit("task-edited", task);
      task.editing = !task.editing;
      console.log("task.editing", task.editing);
      console.log("Editing function called");
    }

    function deleteTask(task) {
      props.tasks.splice(props.tasks.indexOf(task), 1);
      emit("task-deleted", task);
      console.log(`Deleted task: ${task.text}`);
    }

    function handleAction(action, task) {
      if (action === "Edit") {
        editTask(task);
      } else if (action === "Delete") {
        deleteTask(task);
      }
    }

    return {
      newTask,
      getTodaysDate,
      createNewTask,
      completeTask,
      editTask,
      deleteTask,
      handleAction,
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
      class="border border-gray-300 rounded px-2 py-1"
    />

    <div style="margin: 10px 0 10px 0">
      Check a task to remove it from the list, or use the buttons to edit or delete it.
    </div>

    <div v-for="(task, index) in tasks" :key="task.id"class="flex items-center gap-x-3 mb-2">
      <label >
        <input type="checkbox" @click="completeTask(task)" class="border border-gray-300 rounded px-2 py-1 w-4 h-4"/>
        <div v-if="!task.editing" style="display: inline">
          {{ task.text }}
        </div>
        <div v-else style="display: inline">
          <input type="text" v-model="task.text" id="editTask" class="border border-gray-300 rounded px-2 py-1"/>
        </div>
      </label>
      <action-menu
        :actions="['Edit', 'Delete']"
        @action-selected="handleAction($event, task)"
      />
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

export default {
  name: "action-menu",
  props: {
    actions: {
      type: Array,
      default: () => ["Edit", "Delete"],
    },
  },
  emits: ["action-selected", "action-more"],
  setup(props, { emit }) {
    let isOpen = Vue.ref(false);
    const menuRef = Vue.ref(null);

    function toggleMenu(event) {
      event.stopPropagation();
      isOpen.value = !isOpen.value;
      emit("action-more", isOpen.value);
    }

    function selectAction(action) {
      emit("action-selected", action);
      console.log(`you chose to <<${action}>> a task`);
      isOpen.value = false;
    }

    function handleClickOutside(event) {
      if (menuRef.value && !menuRef.value.contains(event.target)) {
        isOpen.value = false;
      }
    }

    Vue.onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    Vue.onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return { isOpen, menuRef, selectAction, toggleMenu };
  },
  template: `
    <div class="inline-block relative">
      <button
        @click="toggleMenu"
        class="inline-block relative bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 focus:outline-none"
      >More</button>

      <div v-if="isOpen" class="absolute left-0 top-full mt-1 bg-white border border-gray-300 shadow z-10">
        <div v-for="(action, index) in actions" :key="index">
          <button
            @click="selectAction(action)"
            class="block w-full text-left px-2 py-1"
          >{{ action }}</button>
        </div>
      </div>
    </div>
  `,
};

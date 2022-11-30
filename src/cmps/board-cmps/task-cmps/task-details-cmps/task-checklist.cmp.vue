<template>
  <section v-if="card.checklists" class="checklists-container">
    <div v-for="checklist in task.checklists" class="checklists">
      <div class="title">
        <h3><span class="task-details-icon">🗹</span>{{ checklist.title }}</h3>
        <button>Hide checked items</button>
        <button>Delete</button>
      </div>
      <div v-for="todo in checklist.todos" class="chechlist-todos">
        <input:Checkbox>{{ todo.title }}</input:Checkbox>
      </div>
      <button v-if="!addItem" @click="addItem = true">Add an item</button>
      <div v-if="addItem" class="add-todo">
        <textarea placeholder="Add an item" cols="30" rows="10"></textarea>
        <button>Add</button>
        <button @click="addItem = false">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['task'],
  name: 'task-checklist',
  components: {},
  data() {
    return {
      addItem: false
    };
  },
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
};
</script>
<style>

</style>
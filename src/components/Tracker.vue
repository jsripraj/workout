<script setup>

  import { ref, computed } from 'vue'

  defineProps(['workout'])

  const emit = defineEmits([
    'click-back', 
    'addExercise', 
    'delExercise',
    'moveExerciseUp',
    'moveExerciseDown',
  ])

  const editing = ref(false)

  const editBtnMsg = computed(() => {
    return editing.value ? 'Done' : 'Edit'
  })

  function addExercise(e) {
    const value = e.target.value.trim()
    e.target.value = ''
    emit('addExercise', value)
  }

</script>

<template>
  <section class="workout-app">
    <header class="header">
      <button @click="$emit('click-back')">Back</button>
      <h1>{{ workout.name }}</h1>
      <button @click="editing = !editing">{{ editBtnMsg }}</button>
    </header>
    <section class="main" >
      <ul class="exercise-list">
          <li
            v-for="x in workout.exercises"
          >
            <div v-if="editing">
              <input
                type="text"
                v-model="x.name"
              >
              <button @click="$emit('moveExerciseUp', x)">Up</button>
              <button @click="$emit('moveExerciseDown', x)">Down</button>
              <button @click="$emit('delExercise', x)">x</button>
            </div>
            <div v-else>
              <label>{{ x.name }}</label>
            </div>
          </li>
      </ul>
      <input
        placeholder="Add an exercise"
        @keyup.enter="addExercise"
      >
    </section>
  </section>
</template>

<style>
</style>
<script setup>

import { ref, computed } from 'vue'

defineProps(['workouts'])

const emit = defineEmits(['addWorkout', 'clickWorkout', 'delWorkout'])

const editing = ref(false)

const editBtnMsg = computed(() => {
  return editing.value ? 'Done' : 'Edit'
})

function addWorkout(e) {
    const value = e.target.value.trim()
    e.target.value = ''
    emit('addWorkout', value)
}

</script>

<template>
  <section class="workout-app">
    <header class="header">
      <h1>Workout Tracker</h1>
    </header>
    <section class="main" >
      <button @click="editing = !editing">{{ editBtnMsg }}</button>
      <ul>
        <li
          v-for="workout in workouts"
        >
          <div v-if="editing">
            <input
              type="text"
              v-model="workout.name"
            >
            <button @click="$emit('delWorkout', workout)">x</button>
          </div>
          <div v-else>
            <label @click="$emit('clickWorkout', workout)">{{ workout.name }}</label>
          </div>
        </li>
      </ul>
      <input
        class="new-workout"
        placeholder="Add a workout"
        @keyup.enter="addWorkout"
      >
    </section>
  </section>
</template>

<style>
</style>
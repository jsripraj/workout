<script setup>

defineProps(['workouts'])
const emit = defineEmits(['addWorkout', 'clickWorkout'])

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
      <input
        class="new-workout"
        placeholder="Add a workout"
        @keyup.enter="addWorkout"
      >
    </header>
    <section class="main" >
      <ul>
        <li
          v-for="workout in workouts"
          @click="$emit('clickWorkout', workout)"
        >
          {{ workout.name }}
        </li>
      </ul>
    </section>
  </section>
</template>

<style>
</style>
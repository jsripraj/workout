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
        <ul class="workout-list">
            <li
                v-for="workout in workouts"
                class="workout"
                :key="workout.id"
            >
                <div 
                    class="view"
                    @click="$emit('clickWorkout', workout)"
                >
                    <label>{{ workout.title }}</label>
                </div>
            </li>
        </ul>
    </section>
  </section>
</template>

<style>
</style>
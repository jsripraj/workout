<script setup>

import { ref, computed } from 'vue'

defineProps(['workouts'])

const emit = defineEmits([
  'addWorkout', 
  'clickWorkout', 
  'delWorkout', 
  'moveWorkoutUp', 
  'moveWorkoutDown'
])

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
  <div class="container text-center">
    <header class="header">
      <h1>Workout Tracker</h1>
    </header>
    <section class="main" >
      <div v-for="workout in workouts">
        <div v-if="editing">
          <input type="text" v-model="workout.name">
          <button @click="$emit('moveWorkoutUp', workout)">&#8679</button>
          <button @click="$emit('moveWorkoutDown', workout)">&#8681</button>
          <button @click="$emit('delWorkout', workout)">X</button>
        </div>
        <div v-else>
          <h2 @click="$emit('clickWorkout', workout)">{{ workout.name }}</h2>
        </div>
      </div>
      
      <div class="row">
        <input
          class="new-workout"
          placeholder="Add a workout"
          @keyup.enter="addWorkout"
        >
      </div>
      <div class="row">
        <button type="button" class="btn btn-primary" @click="editing = !editing">{{ editBtnMsg }}</button>
      </div>
    </section>
  </div>
</template>

<style>
</style>
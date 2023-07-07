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
const newWorkout = ref('')

const editBtnMsg = computed(() => {
  return editing.value ? 'Done' : 'Edit Workouts'
})

function addWorkout() {
    const value = newWorkout.value
    emit('addWorkout', value)
    newWorkout.value = ''
}

</script>

<template>
  <div class="container text-center my-4">
    <div class="grid row-gap-5">
      <div class="row">
        <div class="col">
          <header class="header">
            <h1 class="display-1">Workout Tracker</h1>
          </header>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div v-for="workout in workouts">
            <div v-if="editing" class="input-group">
              <input v-model="workout.name" type="text" class="form-control">
              <button type="button" class="btn btn-outline-primary" @click="$emit('moveWorkoutUp', workout)">
                <img src="/assets/icons/arrow-up-circle-fill.svg" alt="Move Up">
              </button>
              <button type="button" class="btn btn-outline-primary" @click="$emit('moveWorkoutDown', workout)">
                <img src="/assets/icons/arrow-down-circle-fill.svg" alt="Move Down">
              </button>
              <button type="button" class="btn btn-outline-primary" @click="$emit('delWorkout', workout)">
                <img src="/assets/icons/x-circle-fill.svg" alt="Delete">
              </button>
            </div>

            <div v-else>
              <h2 @click="$emit('clickWorkout', workout)">{{ workout.name }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="input-group mb-3" data-bs-theme="dark">
            <input type="text" class="form-control" placeholder="Add a workout" v-model="newWorkout" @keyup.enter="addWorkout">
            <button class="btn btn-outline-light" type="button" @click="addWorkout">+</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-primary" @click="editing = !editing">{{ editBtnMsg }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
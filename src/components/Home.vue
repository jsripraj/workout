<script setup>

import { ref, computed } from 'vue'

const props = defineProps(['workouts', 'user']);

const emit = defineEmits([
  'addWorkout', 
  'clickWorkout', 
  'delWorkout', 
  'moveWorkoutUp', 
  'moveWorkoutDown',
  'signout',
  'saveWorkouts',
  'openHistory',
])

const editing = ref(false)

const newWorkout = ref('')

const editBtnMsg = computed(() => {
  return editing.value ? 'Save' : 'Edit Workouts'
});

function addWorkout() {
    const value = newWorkout.value
    emit('addWorkout', value)
    newWorkout.value = ''
}

function saveWorkouts() {
  editing.value = false;
  emit('saveWorkouts');
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="navbar-brand">Hello, {{ user.displayName }}</div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
          <li class="nav-item">
            <div @click="$emit('openHistory')" class="nav-link" aria-current="page">History</div>
          </li>
          <li class="nav-item">
            <div @click="editing = true" class="nav-link" aria-current="page">Edit Workouts</div>
          </li>
          <li class="nav-item">
            <div @click="$emit('signout')" class="nav-link" aria-current="page">Sign Out</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>  
  <div class="container text-center my-4">
    <div class="grid row-gap-5">
      <div class="row">
        <div class="col">
          <header class="header">
            <p class="display-1">Workout Tracker</p>
          </header>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div v-for="workout in workouts">
            <div v-if="editing" class="input-group">
              <input v-model="workout.name" type="text" class="form-control">
              <button type="button" class="btn btn-secondary" @click="$emit('moveWorkoutUp', workout)">
                <img src="/assets/icons/arrow-up-circle-fill.svg" alt="Move Up">
              </button>
              <button type="button" class="btn btn-secondary" @click="$emit('moveWorkoutDown', workout)">
                <img src="/assets/icons/arrow-down-circle-fill.svg" alt="Move Down">
              </button>
              <button type="button" class="btn btn-secondary" @click="$emit('delWorkout', workout)">
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
          <button v-if="editing" type="button" class="btn btn-warning" @click="saveWorkouts">{{ editBtnMsg }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
</style>
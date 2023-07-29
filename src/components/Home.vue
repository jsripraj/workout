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
      <a class="navbar-brand">Hello, {{ user.displayName }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a @click="$emit('openHistory')" class="nav-link" aria-current="page" href="#">History</a>
          </li>
          <li class="nav-item">
            <a @click="editing = true" class="nav-link" aria-current="page" href="#">Edit Workouts</a>
          </li>
          <li class="nav-item">
            <a @click="$emit('signout')" class="nav-link" aria-current="page" href="#">Sign Out</a>
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
              <input v-model="workout.name" type="text" class="form-control" name="workout">
              <button type="button" class="btn btn-light border border-secondary-subtle" @click="$emit('moveWorkoutUp', workout)">
                <img src="/assets/icons/arrow-up.svg" alt="Move Up">
              </button>
              <button type="button" class="btn btn-light border border-secondary-subtle" @click="$emit('moveWorkoutDown', workout)">
                <img src="/assets/icons/arrow-down.svg" alt="Move Down">
              </button>
              <button type="button" class="btn btn-light border border-secondary-subtle" @click="$emit('delWorkout', workout)">
                <img src="/assets/icons/x-lg.svg" alt="Delete">
              </button>
            </div>

            <div v-else class="list-group">
              <a @click="$emit('clickWorkout', workout)" href="#" class="fs-2 list-group-item list-group-item-action">{{ workout.name }}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="input-group my-3">
            <input type="text" class="form-control" placeholder="Add a workout" v-model="newWorkout" @keyup.enter="addWorkout" name="add">
            <button class="btn btn-light" type="button" @click="addWorkout">
              <img src="/assets/icons/plus.svg">
            </button>
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
<script setup>
import { ref, reactive, watch, watchEffect } from 'vue'
import Home from './components/Home.vue'
import Tracker from './components/Tracker.vue'

import * as firebase from '/src/firebase.js';
import * as types from '/src/types.js';

const user = reactive(new types.User());
firebase.initAuthObserver(user);
// const db = firebase.newFirestore();

const appState = {
    page: ref(types.pageTypes.Home),
    workouts: ref(JSON.parse(localStorage.getItem('workouts') || '[]')),
    trackedWorkout: ref(),
}

// persist state -- eventually this will be stored in database
watchEffect(() => {
  localStorage.setItem('workouts', JSON.stringify(appState.workouts.value))
  // localStorage.setItem('workouts', JSON.stringify([]))
})

function addExercise(exName) {
  if (exName) {
    appState.trackedWorkout.value.exercises.push(new types.Exercise(exName))
  }
}

function addSet(exercise) {
  exercise.sets.push(new types.Set(`${exercise.sets.length + 1}`))
}

function delSet(exercise) {
  exercise.sets.pop();
}

function addWorkout(woName) {
  if (woName) {
    appState.workouts.value.push(new types.Workout(woName))
  }
}

function delExercise(exercise) {
  let i = 0
  for (const x of appState.trackedWorkout.value.exercises) {
    if (x === exercise) {
      appState.trackedWorkout.value.exercises.splice(i, 1)
      break
    }
    i++
  }
}

function delWorkout(workout) {
  let i = 0
  for (const w of appState.workouts.value) {
    if (w === workout) {
      appState.workouts.value.splice(i, 1)
      break
    }
    i++
  }
}

function moveExerciseDown(exercise) {
  for (let i = 0; i < appState.trackedWorkout.value.exercises.length - 1; i++) {
    if (appState.trackedWorkout.value.exercises[i] === exercise) {
      let t = appState.trackedWorkout.value.exercises[i]
      appState.trackedWorkout.value.exercises[i] = appState.trackedWorkout.value.exercises[i+1]
      appState.trackedWorkout.value.exercises[i+1] = t
      break
    }
  }
}

function moveExerciseUp(exercise) {
  for (let i = 1; i < appState.trackedWorkout.value.exercises.length; i++) {
    if (appState.trackedWorkout.value.exercises[i] === exercise) {
      let t = appState.trackedWorkout.value.exercises[i]
      appState.trackedWorkout.value.exercises[i] = appState.trackedWorkout.value.exercises[i-1]
      appState.trackedWorkout.value.exercises[i-1] = t
      break
    }
  }
}

function moveWorkoutDown(workout) {
  for (let i = 0; i < appState.workouts.value.length; i++) {
    if (appState.workouts.value[i] === workout) {
      if (i < appState.workouts.value.length - 1) {
        let t = appState.workouts.value[i+1]
        appState.workouts.value[i+1] = appState.workouts.value[i]
        appState.workouts.value[i] = t
      }
      break
    }
  }
}

function moveWorkoutUp(workout) {
  for (let i = 0; i < appState.workouts.value.length; i++) {
    if (appState.workouts.value[i] === workout) {
      if (i > 0) {
        let t = appState.workouts.value[i]
        appState.workouts.value[i] = appState.workouts.value[i-1]
        appState.workouts.value[i-1] = t
      }
      break
    }
  }
}

function openTracker(workout) {
  appState.page.value = types.pageTypes.Tracker
  appState.trackedWorkout.value = workout
}

function closeTracker() {
  appState.page.value = types.pageTypes.Home
  appState.trackedWorkout.value = null
}

function saveTrackedWorkout() {
  console.log('called saveTrackedWorkout');
  firebase.write(db);
}

function signout() {
  firebase.signout();
}

</script>

<template>
  <div class="container">
    <Home v-if="appState.page.value === types.pageTypes.Home"
        :workouts="appState.workouts.value" 
        :user="user"
        @add-workout="addWorkout" 
        @click-workout="openTracker"
        @del-workout="delWorkout"
        @move-workout-up="moveWorkoutUp"
        @move-workout-down="moveWorkoutDown" 
        @signout="signout"
    />
    <Tracker v-else-if="appState.page.value === types.pageTypes.Tracker"
        :workout = "appState.trackedWorkout.value"
        @click-back="closeTracker"
        @add-exercise="addExercise"
        @del-exercise="delExercise"
        @move-exercise-up="moveExerciseUp"
        @move-exercise-down="moveExerciseDown"
        @add-set="addSet"
        @del-set="delSet"
        @save-tracked-workout="saveTrackedWorkout"
    />
  </div>
</template>
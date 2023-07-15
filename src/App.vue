<script setup>
import { ref, reactive, watch } from 'vue'

import Home from './components/Home.vue'
import Tracker from './components/Tracker.vue'
import History from './components/History.vue'
import * as firebase from '/src/firebase.js';
import * as types from '/src/types.js';

const user = reactive(new types.User());
firebase.initAuthObserver(user);

const state = {
    page: ref(types.pageTypes.Home),
    workouts: ref([]),
    trackedWorkout: ref({}),
    trackedIsHistorical: false,
    historyAltered: true,
}

watch(user, (populatedUser, _) => {
  if (populatedUser.email) {
    firebase.getCurrentWorkouts(user.email, state.workouts);
  }
})

function addExercise(exName) {
  if (exName) {
    state.trackedWorkout.value.exercises.push({
      name: exName,
      sets: [],
    });
  }
}

function addSet(exercise) {
  exercise.sets.push({
    name: exercise.sets.length + 1,
    weight: null,
    reps: null,
  });
}

function delSet(exercise) {
  exercise.sets.pop();
}

function addWorkout(woName) {
  if (woName) {
    state.workouts.value.push({
      name: woName,
      date: new Date(),
      description: "Sample description",
      exercises: [],
    })
    writeCurrentWorkouts();
  }
}

function closeHistory() {
  state.page.value = types.pageTypes.Home
}

function closeTracker() {
  state.page.value = types.pageTypes.Home
}

function delExercise(exercise) {
  let i = 0
  for (const x of state.trackedWorkout.value.exercises) {
    if (x === exercise) {
      state.trackedWorkout.value.exercises.splice(i, 1)
      break
    }
    i++
  }
}

function delWorkout(workout) {
  let i = 0
  for (const w of state.workouts.value) {
    if (w === workout) {
      state.workouts.value.splice(i, 1)
      break
    }
    i++
  }
}

function moveExerciseDown(exercise) {
  for (let i = 0; i < state.trackedWorkout.value.exercises.length - 1; i++) {
    if (state.trackedWorkout.value.exercises[i] === exercise) {
      let t = state.trackedWorkout.value.exercises[i]
      state.trackedWorkout.value.exercises[i] = state.trackedWorkout.value.exercises[i+1]
      state.trackedWorkout.value.exercises[i+1] = t
      break
    }
  }
}

function moveExerciseUp(exercise) {
  for (let i = 1; i < state.trackedWorkout.value.exercises.length; i++) {
    if (state.trackedWorkout.value.exercises[i] === exercise) {
      let t = state.trackedWorkout.value.exercises[i]
      state.trackedWorkout.value.exercises[i] = state.trackedWorkout.value.exercises[i-1]
      state.trackedWorkout.value.exercises[i-1] = t
      break
    }
  }
}

function moveWorkoutDown(workout) {
  for (let i = 0; i < state.workouts.value.length; i++) {
    if (state.workouts.value[i] === workout) {
      if (i < state.workouts.value.length - 1) {
        let t = state.workouts.value[i+1]
        state.workouts.value[i+1] = state.workouts.value[i]
        state.workouts.value[i] = t
      }
      break
    }
  }
}

function moveWorkoutUp(workout) {
  for (let i = 0; i < state.workouts.value.length; i++) {
    if (state.workouts.value[i] === workout) {
      if (i > 0) {
        let t = state.workouts.value[i]
        state.workouts.value[i] = state.workouts.value[i-1]
        state.workouts.value[i-1] = t
      }
      break
    }
  }
}

function openHistory() {
  state.page.value = types.pageTypes.History;
}

function openTracker(workout, source='') {
  state.trackedIsHistorical = false;
  if (source === 'history') {
    state.trackedIsHistorical = true;
  } 
  state.page.value = types.pageTypes.Tracker
  state.trackedWorkout.value = workout
}

function writeCurrentWorkouts() {
  firebase.writeCurrentWorkouts(user.email, state.workouts.value);
}

function writeWorkoutToHistory() {
  firebase.writeWorkoutToHistory(user.email, state.trackedWorkout.value);
  state.historyAltered = true;
}

function signout() {
  firebase.signout();
}

</script>

<template>
  <div class="container">
    <Home v-if="state.page.value === types.pageTypes.Home"
        :workouts="state.workouts.value" 
        :user="user"
        @add-workout="addWorkout" 
        @click-workout="openTracker"
        @del-workout="delWorkout"
        @move-workout-up="moveWorkoutUp"
        @move-workout-down="moveWorkoutDown" 
        @signout="signout"
        @save-workouts="writeCurrentWorkouts"
        @open-history="openHistory"
    />
    <Tracker v-else-if="state.page.value === types.pageTypes.Tracker"
        :workout = "state.trackedWorkout.value"
        :historical="state.trackedIsHistorical"
        @close-tracker="closeTracker"
        @add-exercise="addExercise"
        @del-exercise="delExercise"
        @move-exercise-up="moveExerciseUp"
        @move-exercise-down="moveExerciseDown"
        @add-set="addSet"
        @del-set="delSet"
        @save-to-history="writeWorkoutToHistory"
    />
    <History v-else
        @close-history="closeHistory"
    />
  </div>
</template>
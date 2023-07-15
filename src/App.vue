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
    currentWorkouts: ref([]),
    trackedWorkout: ref({}),
    prevPage: types.pageTypes.Home, // so Tracker knows where to go back to 
    historyAltered: true,
    historicalWorkouts: ref([]),
}

watch(user, (populatedUser, _) => {
  if (populatedUser.email) {
    firebase.getCurrentWorkouts(user.email, state.currentWorkouts);
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
    state.currentWorkouts.value.push({
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
  state.page.value = state.prevPage;
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
  for (const w of state.currentWorkouts.value) {
    if (w === workout) {
      state.currentWorkouts.value.splice(i, 1)
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
  for (let i = 0; i < state.currentWorkouts.value.length; i++) {
    if (state.currentWorkouts.value[i] === workout) {
      if (i < state.currentWorkouts.value.length - 1) {
        let t = state.currentWorkouts.value[i+1]
        state.currentWorkouts.value[i+1] = state.currentWorkouts.value[i]
        state.currentWorkouts.value[i] = t
      }
      break
    }
  }
}

function moveWorkoutUp(workout) {
  for (let i = 0; i < state.currentWorkouts.value.length; i++) {
    if (state.currentWorkouts.value[i] === workout) {
      if (i > 0) {
        let t = state.currentWorkouts.value[i]
        state.currentWorkouts.value[i] = state.currentWorkouts.value[i-1]
        state.currentWorkouts.value[i-1] = t
      }
      break
    }
  }
}

function openHistory() {
  if (state.historyAltered) {
    firebase.getHistoricalWorkouts(user.email, state.historicalWorkouts);
  }
  state.historyAltered = false;
  state.page.value = types.pageTypes.History;
}

function openTracker(workout) {
  state.prevPage = state.page.value;
  state.page.value = types.pageTypes.Tracker
  state.trackedWorkout.value = workout
}

function writeCurrentWorkouts() {
  firebase.writeCurrentWorkouts(user.email, state.currentWorkouts.value);
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
      :workouts="state.currentWorkouts.value" 
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
      :workouts="state.historicalWorkouts.value"
      @close-history="closeHistory"
      @openTracker="openTracker"
    />
  </div>
</template>
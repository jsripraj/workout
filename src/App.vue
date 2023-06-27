<script setup>
import { ref, watchEffect } from 'vue'
import Home from './components/Home.vue'
import Tracker from './components/Tracker.vue'

const pageTypes = {
    Home: 'home',
    Tracker: 'tracker'
}

const appState = {
    page: ref(pageTypes.Home),
    workouts: ref(JSON.parse(localStorage.getItem('workouts') || '{}')),
    trackedWorkout: ref(""),
}

// persist state -- eventually this will be stored in database
watchEffect(() => {
  localStorage.setItem('workouts', JSON.stringify(appState.workouts.value))
  // localStorage.setItem('workouts', JSON.stringify({}))
})

class Workout {
  constructor(name) {
    this.name = name;
    this.exercises = new Object();
  }
}

class Exercise {
  constructor(name) {
    this.name = name;
  }
}

function addWorkout(woName) {
  if (woName) {
    appState.workouts.value[woName] = new Workout(woName);
    console.log(`workouts: ${JSON.stringify(appState.workouts.value)}`);
  }
}

function addExercise(exName) {
  if (exName) {
    console.log('called addExercise in App.vue')
    console.log(`workouts before: ${JSON.stringify(appState.workouts.value)}`);
    let workout = appState.workouts.value[appState.trackedWorkout.value]
    workout.exercises[exName] = new Exercise(exName)
    console.log(`workouts after: ${JSON.stringify(appState.workouts.value)}`);
  }
}

function delExercise(exercise) {
  console.log(`called delExericse with exercise ${exercise}`)
  delete appState.workouts.value[appState.trackedWorkout.value].exercises[exercise.name]
}

function openTracker(workout) {
  console.log(`workout = ${JSON.stringify(workout)}`)
  appState.page.value = pageTypes.Tracker
  appState.trackedWorkout.value = workout.name
}

function closeTracker() {
  console.log(`called closeTracker`)
  appState.page.value = pageTypes.Home
  appState.trackedWorkout.value = ""
}

</script>

<template>
    <Home v-if="appState.page.value === pageTypes.Home"
        :workouts="appState.workouts.value" 
        @add-workout="addWorkout" 
        @click-workout="openTracker"
    />
    <Tracker v-else-if="appState.page.value === pageTypes.Tracker"
        :workout = "appState.workouts.value[appState.trackedWorkout.value]"
        @click-back="closeTracker"
        @add-exercise="addExercise"
        @del-exercise="delExercise"
    />
</template>
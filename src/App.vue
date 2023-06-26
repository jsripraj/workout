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
    workouts: ref(JSON.parse(localStorage.getItem('workouts') || '[]'))
}

const trackerState = {
    title: "",
    exercises: ref(JSON.parse(localStorage.getItem('exercises') || '[]'))
}

// persist state -- eventually this will be stored in database
watchEffect(() => {
  localStorage.setItem('workouts', JSON.stringify(appState.workouts.value))
})

watchEffect(() => {
  localStorage.setItem('exericses', JSON.stringify(trackerState.exercises.value))
})

function addWorkout(value) {
  if (value) {
    appState.workouts.value.push({
      id: Date.now(),
      title: value,
    })
  }
}

function addExercise(value) {
  if (value) {
    trackerState.exercises.value.push({
      id: Date.now(),
      title: value,
    })
  }
}

function openTracker(workout) {
  console.log(`workout = ${JSON.stringify(workout)}`)
  appState.page.value = pageTypes.Tracker
  trackerState.title = workout.title
}

function closeTracker() {
  console.log(`called closeTracker`)
  appState.page.value = pageTypes.Home
}

</script>

<template>
    <Home v-if="appState.page.value === pageTypes.Home"
        :workouts="appState.workouts.value" 
        @add-workout="addWorkout" 
        @click-workout="openTracker"
    />
    <Tracker v-else-if="appState.page.value === pageTypes.Tracker"
        :title="trackerState.title"
        :exercises="trackerState.exercises.value"
        @click-back="closeTracker"
        @add-exercise="addExercise"
    />
</template>
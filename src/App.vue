<script setup>
import { ref, watchEffect } from 'vue'
import Home from './components/Home.vue'
import Tracker from './components/Tracker.vue'

const STORAGE_KEY = 'vue-workoutmvc'

const pageTypes = {
    Home: 'home',
    Tracker: 'tracker'
}

const appState = {
    page: ref(pageTypes.Home),
    workouts: ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
}

const trackerState = {
    title: ""
}

// persist state -- eventually this will be stored in database
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.workouts.value))
})

function addWorkout(value) {
  if (value) {
    appState.workouts.value.push({
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

</script>

<template>
    <Home v-if="appState.page.value === pageTypes.Home"
        :workouts="appState.workouts.value" 
        @add-workout="addWorkout" 
        @click-workout="openTracker"
    />
    <Tracker v-else-if="appState.page.value === pageTypes.Tracker"
        :title="trackerState.title"
    />
</template>
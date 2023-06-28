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
    workouts: ref(JSON.parse(localStorage.getItem('workouts') || '[]')),
    trackedWorkout: ref(),
}

class Workout {
  constructor(name) {
    this.name = name
    this.description = "Sample description describes the workout and any notes the user wants to include"
    this.exercises = []
  }
}

class Exercise {
  constructor(name) {
    this.name = name
    this.sets = []
  }
}

class Set {
  constructor(name, weight=0, reps=0) {
    this.name = name
    this.weight = weight
    this.reps = reps
  }
}

// persist state -- eventually this will be stored in database
watchEffect(() => {
  localStorage.setItem('workouts', JSON.stringify(appState.workouts.value))
  // localStorage.setItem('workouts', JSON.stringify([]))
})

function addExercise(exName) {
  if (exName) {
    appState.trackedWorkout.value.exercises.push(new Exercise(exName))
  }
}

function addSet(exercise) {
  exercise.sets.push(new Set(`Set ${exercise.sets.length + 1}`))
}

function addWorkout(woName) {
  if (woName) {
    appState.workouts.value.push(new Workout(woName))
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
  appState.page.value = pageTypes.Tracker
  appState.trackedWorkout.value = workout
}

function closeTracker() {
  appState.page.value = pageTypes.Home
  appState.trackedWorkout.value = null
}

</script>

<template>
    <Home v-if="appState.page.value === pageTypes.Home"
        :workouts="appState.workouts.value" 
        @add-workout="addWorkout" 
        @click-workout="openTracker"
        @del-workout="delWorkout"
        @move-workout-up="moveWorkoutUp"
        @move-workout-down="moveWorkoutDown" 
    />
    <Tracker v-else-if="appState.page.value === pageTypes.Tracker"
        :workout = "appState.trackedWorkout.value"
        @click-back="closeTracker"
        @add-exercise="addExercise"
        @del-exercise="delExercise"
        @move-exercise-up="moveExerciseUp"
        @move-exercise-down="moveExerciseDown"
        @add-set="addSet"
    />
</template>
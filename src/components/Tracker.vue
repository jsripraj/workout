<script setup>

  import { ref, computed } from 'vue'

  defineProps(['workout'])

  const emit = defineEmits([
    'click-back', 
    'addExercise', 
    'delExercise',
    'moveExerciseUp',
    'moveExerciseDown',
    'addSet',
    'delSet',
  ])

  const editing = ref(false)

  const editBtnMsg = computed(() => {
    return editing.value ? 'Done' : 'Edit Details'
  })

  function addExercise(e) {
    const value = e.target.value.trim()
    e.target.value = ''
    emit('addExercise', value)
  }

</script>

<template>
  <section class="workout-app">
    <header class="header">
      <button @click="$emit('click-back')">Back</button>
      <h1>{{ workout.name }}</h1>
      <div v-if="editing">
        <input
          type="text"
          placeholder="Add a description"
          v-model="workout.description"
        >
      </div>
      <div v-else>
        <p>{{ workout.description }}</p>
      </div>
      <button @click="editing = !editing">{{ editBtnMsg }}</button>
    </header>
    <section class="main" >
      <ul class="exercise-list">
          <li
            v-for="x in workout.exercises"
          >
            <div v-if="editing">
              <input
                type="text"
                v-model="x.name"
              >
              <button @click="$emit('moveExerciseUp', x)">Up</button>
              <button @click="$emit('moveExerciseDown', x)">Down</button>
              <button @click="$emit('delExercise', x)">x</button>
            </div>
            <div v-else>
              <h3>{{ x.name }}</h3>
              <ul>
                <li v-for="set in x.sets">
                  Set {{ set.name }}
                  <input
                    type="text"
                    v-model="set.weight"
                    placeholder="0"
                  >
                  <label>lbs </label>
                  <input
                    type="text"
                    v-model="set.reps"
                    placeholder="0"
                  >
                  <label>reps </label>
                  <button @click="$emit('delSet', x, set)">x</button>
                </li>
              </ul>
              <button @click="$emit('addSet', x)">Add New Set</button>
            </div>
          </li>
      </ul>
      <input
        placeholder="Add an exercise"
        @keyup.enter="addExercise"
      >
    </section>
  </section>
</template>

<style>
</style>
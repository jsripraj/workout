<script setup>
  defineProps(['title', 'exercises'])
  const emit = defineEmits(['click-back', 'addExercise'])

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
      <h1>{{ title }}</h1>
    </header>
    <section class="main" >
      <ul class="exercise-list">
          <li
            v-for="ex in exercises"
            class="exercise"
            :key="ex.id"
          >
            {{ ex.title }}
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
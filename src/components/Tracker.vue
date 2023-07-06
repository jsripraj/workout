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
    return editing.value ? 'Done' : 'Edit Exercises'
  })

  function addExercise(e) {
    const value = e.target.value.trim()
    e.target.value = ''
    emit('addExercise', value)
  }

</script>

<template>
  <div class="container text-center">
    <header class="header">
      <button @click="$emit('click-back')">Back</button>
      <h1>{{ workout.name }}</h1>
      <h2>{{ new Date().toDateString() }}</h2>
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
    </header>
    <section class="main" >
      <div class="card" style="width: 18rem;"
        v-for="x in workout.exercises"
      >
        <div class="card-body">
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
            <h4 class="card-title">{{ x.name }}</h4>
            <ul>
              <li v-for="set in x.sets">
                Set {{ set.name }}
                <input
                  type="text"
                  v-model="set.weight"
                >
                <label>lbs </label>
                <input
                  type="text"
                  v-model="set.reps"
                >
                <label>reps </label>
              </li>
            </ul>
            <button @click="$emit('addSet', x)">Add New Set</button>
          </div>

        </div>
      </div>
      <input
        placeholder="Add an exercise"
        @keyup.enter="addExercise"
      >
      <button @click="editing = !editing">{{ editBtnMsg }}</button>
    </section>
  </div>
</template>

<style>
</style>
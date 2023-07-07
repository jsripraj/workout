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
    <div class="row">
      <button 
        type="button" 
        class="btn-close position-relative top-0 start-0 mt-3" 
        aria-label="CLose" 
        @click="$emit('click-back')">
      </button>
    </div>
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
    <section class="main" >
      <div 
        v-for="x in workout.exercises"
        class="card my-3"
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
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <h5 class="card-title">{{ x.name }}</h5>
              </li>
              <li class="list-group-item" 
              v-for="set in x.sets">
                <p>Set {{ set.name }}</p>
                <div class="row">
                  <input
                    class="col"
                    type="text"
                    v-model="set.weight"
                  >
                  <label class="col">lbs </label>
                </div>
                <div class="row">
                  <input
                  class="col"
                    type="text"
                    v-model="set.reps"
                  >
                  <label class="col">reps </label>
                </div>
              </li>
              <li class="list-group-item">
                <button 
                  @click="$emit('addSet', x)" 
                  type="button" 
                  class="btn btn-primary m-2">
                  New Set
                </button>
                <button 
                  @click="$emit('delSet', x)"
                  type="button"
                  class = "btn btn-primary m-2">
                  Delete Set
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="row">
        <input
          placeholder="Add an exercise"
          @keyup.enter="addExercise"
        >
      </div>
      <div class="row">
        <button @click="editing = !editing">{{ editBtnMsg }}</button>
      </div>
    </section>
  </div>
</template>

<style>
</style>
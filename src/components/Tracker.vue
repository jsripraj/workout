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
    'saveTrackedWorkout',
  ])

  const startYear = 2000;

  const editing = ref(false)

  const newExercise = ref('')

  const editBtnMsg = computed(() => {
    return editing.value ? 'Done' : 'Edit Exercises'
  })

  function addExercise() {
    const value = newExercise.value
    emit('addExercise', value)
    newExercise.value = ''
  }

  function getYears() {
    const curYear = new Date().getFullYear();
    return [...Array(curYear - startYear + 1).keys()].map(y => y + startYear).reverse();
  }

</script>

<template>
  <div class="container text-center mt-5">
    <div class="position-absolute top-0 start-0 ms-3" data-bs-theme="dark">
      <button  
        type="button" 
        class="btn-close position-relative top-0 start-0 mt-3" 
        aria-label="CLose" 
        @click="$emit('click-back')">
      </button>
    </div>
      <p class="display-2">{{ workout.name }}</p>
      <select class="form-select">
        <option v-for="year in getYears()">{{ year }}</option>
      </select>
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
          <div v-if="editing" class="input-group">
            <input v-model="x.name" type="text" class="form-control">
            <button type="button" class="btn btn-outline-primary" @click="$emit('moveExerciseUp', x)">
              <img src="/assets/icons/arrow-up-circle-fill.svg" alt="Move Up">
            </button>
            <button type="button" class="btn btn-outline-primary" @click="$emit('moveExerciseDown', x)">
              <img src="/assets/icons/arrow-down-circle-fill.svg" alt="Move Down">
            </button>
            <button type="button" class="btn btn-outline-primary" @click="$emit('delExercise', x)">
              <img src="/assets/icons/x-circle-fill.svg" alt="Delete">
            </button>
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
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Add an exercise" v-model="newExercise" @keyup.enter="addExercise">
        <button class="btn btn-outline-primary" type="button" @click="addExercise">+</button>
      </div>

      <div class="row">
        <button @click="editing = !editing">{{ editBtnMsg }}</button>
      </div>
      <div class="row">
        <button @click="$emit('saveTrackedWorkout'); $emit('click-back')">Save to History</button>
      </div>
    </section>
  </div>
</template>

<style>
</style>
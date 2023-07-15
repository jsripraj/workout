<script setup>

  import { ref, computed } from 'vue'

  import * as types from '/src/types.js';

  const props = defineProps(['workout', 'historical']);

  const emit = defineEmits([
    'close-tracker', 
    'addExercise', 
    'delExercise',
    'moveExerciseUp',
    'moveExerciseDown',
    'addSet',
    'delSet',
    'saveToHistory',
  ])

  const selectedYear = ref(types._startYear);

  const selectedMonth = ref('January');

  const selectedDay = ref(1);

  const editing = ref(false)

  const newExercise = ref('')

  const editBtnMsg = computed(() => {
    return editing.value ? 'Done' : 'Edit Exercises'
  })

  const cached = JSON.parse(JSON.stringify(props.workout));

  function addExercise() {
    const value = newExercise.value
    emit('addExercise', value)
    newExercise.value = ''
  }

  function getYears() {
    const curYear = new Date().getFullYear();
    return [...Array(curYear - types._startYear + 1).keys()].map(y => y + types._startYear).reverse();
  }

  function getDays() {
    const year = selectedYear.value;
    const month = types._months[selectedMonth.value];
    const numDaysInMonth = new Date(year, month+1, 0).getDate(); 
    return [...Array(numDaysInMonth).keys()].map(d => d+1);
  }

  function saveToHistory() {
    props.workout.date = new Date(selectedYear.value, types._months[selectedMonth.value], selectedDay.value);
    emit('saveToHistory');
  }

  function today() {
    const now = new Date();
    selectedYear.value = now.getFullYear();
    selectedMonth.value = Object.keys(types._months).find(key => types._months[key] === now.getMonth());
    selectedDay.value = now.getDate();
  }
</script>

<template>
  <div class="container text-center mt-5">
    <div class="position-absolute top-0 start-0 ms-3" data-bs-theme="dark">
      <button  
        type="button" 
        class="btn-close position-relative top-0 start-0 mt-3" 
        aria-label="CLose" 
        @click="$emit('close-tracker')">
      </button>
    </div>
      <p class="display-2">{{ workout.name }}</p>
      <div class="row">
        <div class="col">
          <button @click="today()" type="button" class="btn btn-light">Today</button>
        </div>
        <div class="col">
          <select v-model="selectedMonth" class="form-select">
            <option v-for="month in Object.keys(types._months)">{{ month }}</option>
          </select>
        </div>
        <div class="col">
          <select v-model="selectedDay" class="form-select">
            <option v-for="day in getDays()">{{ day }}</option>
          </select>
        </div>
        <div class="col">
          <select v-model="selectedYear" class="form-select">
            <option v-for="year in getYears()">{{ year }}</option>
          </select>
        </div>
      </div>
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
        <button @click="saveToHistory(); $emit('close-tracker')">Save to History</button>
      </div>
    </section>
  </div>
</template>

<style>
</style>
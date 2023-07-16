<script setup>

  import { ref, computed } from 'vue'

  import * as types from '/src/types.js';

  const props = defineProps(['workout', 'prevpage']);

  const emit = defineEmits([
    'close-tracker', 
    'addExercise', 
    'delExercise',
    'moveExerciseUp',
    'moveExerciseDown',
    'addSet',
    'delSet',
    'addWorkoutToHistory',
    'setHistory',
  ])

  const selectedYear = ref(props.workout.date.getFullYear());

  const selectedMonth = ref([...Object.keys(types._months)].find((name) => {
    return types._months[name] === props.workout.date.getMonth();
  }))

  const selectedDay = ref(props.workout.date.getDate());

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

  function closeTracker() {
    updateDate();
    emit('close-tracker');
  }

  function getYears() {
    const curYear = new Date().getFullYear();
    return [...Array(curYear - types._startYear + 1).keys()].map(y => y + types._startYear).reverse();
  }

  function getDays() {
    const year = selectedYear.value;
    const month = types._months[selectedMonth.value];
    let numDaysInMonth = 31;
    if (month < 11) {
      numDaysInMonth = new Date(year, month+1, 0).getDate(); 
    }
    return [...Array(numDaysInMonth).keys()].map(d => d+1);
  }

  function saveToHistory() {
    updateDate();
    if (props.prevpage === types.pageTypes.Home) {
      emit('addWorkoutToHistory');
    } else if (props.prevpage === types.pageTypes.History) {
      console.log(`prev-page is history`);
      emit('setHistory');
    }
    emit('close-tracker');
  }

  // function today() {
  //   const now = new Date();
  //   selectedYear.value = now.getFullYear();
  //   selectedMonth.value = Object.keys(types._months).find(key => types._months[key] === now.getMonth());
  //   selectedDay.value = now.getDate();
  // }

  function updateDate() {
    props.workout.date = new Date(selectedYear.value, types._months[selectedMonth.value], selectedDay.value);
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <div class="navbar-brand" @click="closeTracker">
        <img src="/assets/icons/arrow-left.svg" width="30" height="24" class="d-inline-block align-text-top">
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <div @click="saveToHistory" class="nav-link" aria-current="page">Save Workout to History</div>
          </li>
          <li class="nav-item">
            <div @click="editing = true" class="nav-link" aria-current="page">Edit Exercises</div>
          </li>
        </ul>
      </div>
    </div>
  </nav>  
  <div class="container text-center mt-3">
      <p class="display-2">{{ workout.name }}</p>
      <div class="row">
        <!-- <div class="col">
          <button @click="today()" type="button" class="btn btn-light">Today</button>
        </div> -->
        <div class="col">
          <select v-model="selectedMonth" class="form-select" name="month">
            <option v-for="month in Object.keys(types._months)">{{ month }}</option>
          </select>
        </div>
        <div class="col-3">
          <select v-model="selectedDay" class="form-select" name="date">
            <option v-for="day in getDays()">{{ day }}</option>
          </select>
        </div>
        <div class="col-4">
          <select v-model="selectedYear" class="form-select" name="year">
            <option v-for="year in getYears()">{{ year }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="my-3">
          <textarea v-model="workout.description" class="form-control" id="description" rows="3" placeholder="Notes"></textarea>
        </div>
      </div>
    <section class="main" >
      <div 
        v-for="x in workout.exercises"
        class="card my-3"
      >
        <div class="card-body">
          <div v-if="editing" class="input-group">
            <input v-model="x.name" type="text" class="form-control" name="exercise">
            <button type="button" class="btn btn-outline-secondary" @click="$emit('moveExerciseUp', x)">
              <img src="/assets/icons/arrow-up.svg" alt="Move Up">
            </button>
            <button type="button" class="btn btn-outline-secondary" @click="$emit('moveExerciseDown', x)">
              <img src="/assets/icons/arrow-down.svg" alt="Move Down">
            </button>
            <button type="button" class="btn btn-outline-secondary" @click="$emit('delExercise', x)">
              <img src="/assets/icons/x-lg.svg" alt="Delete">
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
        <input type="text" class="form-control" placeholder="Add an exercise" v-model="newExercise" @keyup.enter="addExercise" name="add">
        <button class="btn btn-light" type="button" @click="addExercise">+</button>
      </div>

      <div class="row">
        <button v-if="editing" type="button" class="btn btn-warning" @click="editing = false">Save</button>
      </div>
    </section>
  </div>
</template>

<style>
</style>
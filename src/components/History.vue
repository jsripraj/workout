<script setup>

const props = defineProps(['workouts']);

const emit = defineEmits([
    'close-history',
    'openTracker',
]);

function getDate(workout) {
    const date = workout.date;
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

</script>

<template>
  <div class="container text-center mt-5">
    <div class="position-absolute top-0 start-0 ms-3" data-bs-theme="dark">
      <button  
        type="button" 
        class="btn-close position-relative top-0 start-0 mt-3" 
        aria-label="CLose" 
        @click="$emit('close-history')">
      </button>
    </div>
    <div>
      <header class="header">
        <p class="display-1">History</p>
      </header>
    </div>

    <div v-for="workout in workouts">
      <div class="list-group list-group-horizontal">
        <a @click="$emit('openTracker', workout)" class="list-group-item list-group-item-action fs-1" href="#">
          {{ getDate(workout) }}
        </a>
        <a @click="$emit('openTracker', workout)" class="list-group-item list-group-item-action fs-1" href="#">
          {{ workout.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<style>
</style>
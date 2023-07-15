<script setup>

import { Timestamp } from 'firebase/firestore/lite';
import { ref, computed } from 'vue'
import { writeWorkoutToHistory } from '../firebase';

const props = defineProps(['workouts']);

const emit = defineEmits([
    'close-history',
    'openTracker',
]);

function getDate(workout) {
    const date = workout.date.toDate();
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
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
    <div class="grid row-gap-5">
      <div class="row">
        <div class="col">
          <header class="header">
            <p class="display-1">History</p>
          </header>
        </div>
      </div>

    <div v-for="workout in workouts">
        <div class="row">
            <div class="col">
                <h2 @click="$emit('openTracker', workout)">{{ getDate(workout) }}</h2>
            </div>
            <div class="col">
                <h2 @click="$emit('openTracker', workout)">{{ workout.name }}</h2>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
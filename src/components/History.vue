<script setup>

import { ref, computed } from 'vue'

// const props = defineProps(['workouts', 'user']);

const emit = defineEmits([
//   'addWorkout', 
]);
</script>

<template>
  <div class="container text-center my-4">
    <div class="grid row-gap-5">
      <div class="row">
        <div class="col">
          <header class="header">
            <p class="display-1">History</p>
          </header>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <!-- <div v-for="workout in workouts">
            <h2 @click="$emit('clickWorkout', workout)">{{ workout.name }}</h2>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
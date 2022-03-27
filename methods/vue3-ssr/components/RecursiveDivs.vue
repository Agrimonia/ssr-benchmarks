
<script setup>
import { computed } from 'vue'

const props = defineProps(['depth', 'breadth'])

const depthMin1 = computed(() => {
  return props.depth - 1;
});

const breadthMin1 = computed(() => {
  return props.breadth - 1;
});
</script>

<template>
  <div v-if="depth <= 0">abcdefghij</div>
  <div v-else v-on:click="console.log('clicked')">
    <RecursiveDivs v-for="n in breadth" v-bind:key="n" :depth="depthMin1" :breadth="breadthMin1" />
  </div>
</template>


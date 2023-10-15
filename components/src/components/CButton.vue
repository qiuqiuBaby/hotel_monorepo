<template>
  <div class="btn">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg?: string
}>()

</script>

<style scoped>
.btn{
  background-color: aquamarine;
  padding: 5px;
  border: 1px solid #ccc;
  width: 100px;
  color: #000000;
}
</style>
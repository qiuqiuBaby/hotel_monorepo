<template>
  <TopNavBar />
  <div class="flex">
    <NavMenu />
   <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import TopNavBar from '@/components/TopNavBar.vue';
import NavMenu from '@/components/NavMenu.vue'
import { RouterView } from 'vue-router';
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>

<script setup lang="ts">
import { isNumber } from '@hotel/utils'
import { CBtn } from '@hotel/components'
import { fetchUsersList } from '@hotel/apis'
console.log(isNumber('11sda'), 'isNumber========');
const res = fetchUsersList()
console.log('res========',res);

</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CBtn msg="测试按钮"></CBtn>
  </div>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

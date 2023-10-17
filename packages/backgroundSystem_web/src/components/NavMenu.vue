<template>
  <el-menu default-active="settledMerchants" :router="true" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
    @close="handleClose">
    <el-menu-item index="settledMerchants">
      <el-icon><icon-menu /></el-icon>
      <template #title>入驻商家管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue';

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: calc(100vh - 45px);
}
</style>

<template>
  <div class="bg-sky-800 p-10px text-light-50 h-45px flex items-center">
    <span>XXX管理平台</span>
    <div class="flex fixed right-10px">
      <el-dropdown popper-class="head-nav-dropdown" :teleported="false" :popper-options="{
        modifiers: [
          {
            name: 'arrow',
            options: {},
            fn({ state }) {
              const { arrow } = state.elements;
              arrow && (arrow.style.display = 'none');
            }
          }
        ]
      }">
        <div class="flex text-light-50">
          <el-icon>
            <Bell />
          </el-icon>
          <span class="flex items-center">用户2423423</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div>退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

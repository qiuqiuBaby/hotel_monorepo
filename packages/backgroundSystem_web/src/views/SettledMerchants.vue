<template>
  <div>
    <ConditionalSearch :search-fields="searchFields" :handleSearch="handleSearch"></ConditionalSearch>
  </div>
</template>

<script setup lang="ts">
import ConditionalSearch from '@/components/ConditionalSearch.vue';
const searchFields = [
  {
    type: 'input',
    value: 'personId',
    placeholder: '请输入身份证',
    label: '身份证',
  },
  {
    type: 'select',
    value: 'status',
    label: '账号类型',
    placeholder: '请选择账号类型',
    option: [
      {
        value: 1,
        label: '正式账号',
      },
      {
        value: 2,
        label: '试用账号',
      },
    ],
  },
];
// 搜索按钮
const handleSearch = (data: any) => {
  console.log(data, '33333');

};
</script>
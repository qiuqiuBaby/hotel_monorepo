<template>
  <div class="w-full">
    <ConditionalSearch :search-fields="searchFields" :handleSearch="handleSearch"></ConditionalSearch>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="身份证" />
      <el-table-column prop="date" label="姓名" />
      <el-table-column prop="name" label="位置" />
      <el-table-column prop="address" label="租户数" />
      <el-table-column prop="address" label="账号状态" />
      <el-table-column label="操作" />
    </el-table>
    <div class="float-right mt-10px">
      <el-pagination v-model:current-page="currentPage2" v-model:page-size="pageSize2" :page-sizes="[10, 20, 30, 40]"
        :small="false" :background="true" layout="sizes, prev, pager, next" :total="10000" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ConditionalSearch from '@/components/ConditionalSearch.vue';
// 头部搜索-参数
const searchFields = [
  {
    type: 'input',
    value: 'personId',
    placeholder: '请输入身份证',
    label: '身份证',
  },
  {
    type: 'input',
    value: 'personName',
    placeholder: '请输入姓名',
    label: '姓名',
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
// 表格
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
// 分页器
const currentPage2 = ref(5);
const pageSize2 = ref(10);
</script>

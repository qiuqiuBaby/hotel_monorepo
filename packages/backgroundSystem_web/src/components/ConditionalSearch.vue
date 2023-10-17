<template>
  <div class="flex items-center p-15px flex-wrap min-w-full">
    <div class="flex flex-wrap">
      <div v-for="(item, index) in props.searchFields" :key="index" class="flex mr-50px items-center">
          <label class="flex items-center whitespace-nowrap">{{ item.label }}：</label>
          <!-- 类型为输入框 -->
          <template v-if="item.type === 'input'">
            <el-input v-model="sreachData[item.value]" :placeholder="item.placeholder" />
          </template>
          <!-- 类型为下拉选择框 -->
          <template v-else-if="item.type === 'select'">
            <el-select v-model="sreachData[item.value]" class="m-2" :placeholder="item.placeholder">
              <el-option v-for="selector in item.option" :key="selector.value" :label="selector.label"
                :value="selector.value" />
            </el-select>
          </template>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="fetchPageList">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
const props = defineProps({
  searchFields: {
    type: Array as () => SearchField[],
    required: true,
  },
  handleSearch: {
    type: Function,
    required: true,
  }
});

onMounted(() => {
  createSearchData();
});

// props传参类型
type SearchField = {
  type: 'input' | 'select';
  value: string;
  label: string;
  placeholder?: string;
  option?: SearchFieldOption[];
};

type SearchFieldOption = {
  value: string | number;
  label: string;
};

// 构建searchData  搜索查询参数
const sreachData: {[key: string] : string} = reactive({});
const createSearchData = () => {
  props.searchFields?.forEach((item) => {
    sreachData[item.value] = '';
  });
};

// 搜索
const fetchPageList = () => {
  props.handleSearch(sreachData)
}
</script>


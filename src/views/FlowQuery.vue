<template>
  <div class="flow-chart-query">
    <h2>流程图查询</h2>
    
    <!-- 查询条件 -->
    <el-form :model="queryForm" class="query-form" inline>
      <el-form-item label="创建日期">
        <el-date-picker v-model="queryForm.createDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item label="流程图名称">
        <el-input v-model="queryForm.chartName" placeholder="请输入流程图名称" />
      </el-form-item>
      <el-form-item label="流程图类别">
        <el-select v-model="queryForm.chartType" placeholder="请选择流程图类别">
          <el-option label="类别 1" value="type1"></el-option>
          <el-option label="类别 2" value="type2"></el-option>
          <el-option label="类别 3" value="type3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="queryForm.creator" placeholder="请输入创建人" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 流程图列表 -->
    <el-table :data="flowChartList" style="width: 100%">
      <el-table-column prop="createDate" label="创建日期" />
      <el-table-column prop="chartType" label="流程图类别" />
      <el-table-column prop="chartName" label="流程图名称" />
      <el-table-column prop="lastRunTime" label="最近运行时间" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="resultCount" label="结果条数" />
      <el-table-column prop="runCount" label="已运行次数" />
      <el-table-column prop="creator" label="创建人" />

      <!-- <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="runOnce(scope.row)">运行一次</el-button>
          <el-button size="mini" @click="showDetails(scope.row)">详情</el-button>
          <el-button size="mini" @click="editChart(scope.row)">编辑</el-button>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template #default="scope">
          <el-dropdown>
            <el-button link>
              更多操作 <el-icon><el-icon-arrowdown/></el-icon>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="runOnce(scope.row)">运行一次</el-dropdown-item>
              <el-dropdown-item @click="showDetails(scope.row)">详情</el-dropdown-item>
              <el-dropdown-item @click="editChart(scope.row)">编辑</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const queryForm = ref({
  createDate: [],
  chartName: '',
  chartType: '',
  creator: ''
});

const flowChartList = ref([
  {
    createDate: '2024-09-01',
    chartType: '类别 1',
    chartName: '流程图 A',
    lastRunTime: '2024-09-15',
    status: '成功',
    resultCount: 100,
    runCount: 5,
    creator: '张三'
  },
  {
    createDate: '2024-08-15',
    chartType: '类别 2',
    chartName: '流程图 B',
    lastRunTime: '2024-09-10',
    status: '失败',
    resultCount: 0,
    runCount: 2,
    creator: '李四'
  }
  // 可以添加更多示例数据
]);

const fetchData = () => {
  // 在这里添加查询逻辑，例如发起 API 请求获取数据
  console.log('查询条件:', queryForm.value);
};

const runOnce = (row) => {
  console.log('运行一次:', row);
};

const showDetails = (row) => {
  console.log('查看详情:', row);
};

const editChart = (row) => {
  console.log('编辑流程图:', row);
};
</script>

<style scoped>
.flow-chart-query {
  padding: 20px;
}
.query-form {
  margin-bottom: 20px;
}
</style>

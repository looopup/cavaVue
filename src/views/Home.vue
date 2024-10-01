<template>
  <el-container>
    <!-- 顶部导航区域 -->
    <el-header height="30px" class="dashboard-header">
      <h2>Dashboard</h2>
      <el-icon :size="20">
        <el-icon-edit />
      </el-icon>
      <el-icon :size="20">
        <el-icon-money />
      </el-icon>
    </el-header>

    <!-- 主内容区域 -->
    <el-main>
      <!-- 统计信息 -->
      <el-row :gutter="20" class="stats-row">
        <el-col :span="6">
          <el-card class="box-card">
            <el-statistic
              title="用户数量"
              :value="5123"
              :precision="0"
              value-style="color: #3f8600;"
              :prefix="User"
            />
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card">
            <el-statistic
              title="今日订单"
              :value="1456"
              :precision="0"
              value-style="color: #1677ff;"
              :prefix="el-icon-s-order"
            />
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card">
            <el-statistic
              title="访问量"
              :value="93000"
              :precision="0"
              value-style="color: #ff4500;"
              :prefix="el-icon-view"
            />
          </el-card>
        </el-col>

        <el-col :span="6">
          <el-card class="box-card">
            <el-statistic
              title="收入"
              :value="25000"
              :precision="2"
              value-style="color: #2db7f5;"
              :prefix="el-icon-money"
              suffix="元"
            />
          </el-card>
        </el-col>
      </el-row>

      <!-- 活动记录 -->
      <el-row :gutter="20" class="activity-row">
        <el-col :span="16">
          <el-card>
            <el-row>
              <el-col :span="12">
                <h3>销售额趋势</h3>
              </el-col>
              <el-col :span="12" class="text-right">
                <el-button type="primary" size="small">查看详情</el-button>
              </el-col>
            </el-row>

            <div class="chart-placeholder">
              <!-- 这里可以放置图表组件，或者一个图片示例 -->
              <p>图表展示区域</p>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card>
            <h3>近期活动</h3>
            <el-timeline>
              <el-timeline-item timestamp="2024-09-30">系统更新至 v2.1.0</el-timeline-item>
              <el-timeline-item timestamp="2024-09-28">新增用户注册功能</el-timeline-item>
              <el-timeline-item timestamp="2024-09-25">订单系统优化</el-timeline-item>
              <el-timeline-item timestamp="2024-09-22" placement="top">新增权限管理功能</el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>

      <!-- 其他模块 -->
      <el-row :gutter="20" class="other-modules">
        <el-col :span="24">
          <el-card>
            <h3>待处理事项</h3>
            <el-table :data="todoList" style="width: 100%">
              <el-table-column prop="task" label="任务" />
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="date" label="截止日期" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 待处理事项数据
const todoList = ref([
  { task: '完成新用户注册流程', status: '进行中', date: '2024-10-05' },
  { task: '修复订单支付问题', status: '已完成', date: '2024-09-29' },
  { task: '优化首页加载速度', status: '待处理', date: '2024-10-10' },
]);
</script>

<style scoped>
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 0 20px;
  border-bottom: 1px solid #ebebeb;
}

.stats-row {
  margin-bottom: 20px;
}

.box-card {
  text-align: center;
  padding: 10px;
}

.activity-row {
  margin-bottom: 20px;
}

.chart-placeholder {
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-right {
  text-align: right;
}

.other-modules {
  margin-bottom: 20px;
}
</style>

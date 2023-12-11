<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
import { zhCn } from 'element-plus/es/locale/index'
</script>

<style scoped></style>
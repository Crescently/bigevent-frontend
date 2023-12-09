<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
</template>

<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { artGetChannelsService } from '@/interface/article.js'
import { Delete, Edit } from '@element-plus/icons-vue'
//创建文章列表
const channelList = ref([])
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  console.log(res)
  // channelList.value = res.data.data
  loading.value = false
  channelList.value = [
    { id: 44133, cate_name: '新闻', cate_alias: 'news' },
    { id: 44157, cate_name: '热点', cate_alias: 'hot' }
  ]
  console.log(channelList)
}
getChannelList()
const onEditChannel = (row) => {
  console.log(row)
}
const onDelChannel = (row) => {
  console.log(row)
}
</script>

<style lang="scss" scoped></style>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addArticle">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.categoryId" />
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" v-loading="loading" style="width: 100%">
      <el-table-column label="文章标题" prop="title" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="categoryId"></el-table-column>
      <el-table-column label="发表时间" prop="createTime">
        <template #default="{ row }">
          {{ formatTime(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pageNum"
      v-model:page-size="params.pageSize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <article-edit ref="article" @success="onSuccess" />
  </page-container>
</template>

<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { onMounted, ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from '@/components/ChannelSelect.vue'
import { artDelService, artGetListService } from '@/interface/article.js'
import ArticleEdit from '@/components/ArticleEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatTime } from '@/utils/timeformat.js'

const articleList = ref([])
const total = ref(0)
const article = ref()

const params = ref({
  pageNum: 1,
  pageSize: 5,
  categoryId: null,
  state: null
})
const loading = ref(false)
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data.items
  total.value = res.data.total
  loading.value = false
}
onMounted(() => {
  getArticleList()
})

const addArticle = () => {
  article.value.drawerOpen({})
}
const onEditArticle = (row) => {
  article.value.drawerOpen(row)
}
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  await getArticleList()
}

const onSizeChange = (size) => {
  params.value.pageNum = 1
  params.value.pageSize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pageNum = page
  getArticleList()
}

const onSearch = () => {
  params.value.pageNum = 1
  getArticleList()
}

const onReset = () => {
  params.value.pageNum = 1
  params.value.categoryId = ''
  params.value.state = ''
  getArticleList()
}

const onSuccess = () => {
  //是编辑，直接渲染当前页
  getArticleList()
}
</script>

<style lang="scss" scoped></style>
<template>
  <!-- 抽屉 -->
  <el-drawer
    v-model="visibleDrawer"
    :title="title.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="categoryId">
        <channel-select v-model="formModel.categoryId" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="coverImg">
        <el-upload
          class="avatar-uploader"
          :auto-upload="true"
          :show-file-list="false"
          action="http://localhost:8081/upload"
          name="file"
          :headers="{'Authorization':store.token}"
          :on-success="uploadSuccess"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editor"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Publish('已发布')">发布</el-button>
        <el-button type="info" @click="Publish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import ChannelSelect from '@/components/ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artEditService, artGetDetailService, artPublishService } from '@/interface/article.js'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores/user.js'

const visibleDrawer = ref(false)

const defaultForm = {
  title: '',
  categoryId: '',
  coverImg: '',
  content: '',
  state: ''
}
const formModel = ref({
  ...defaultForm
})

const store = userStore()

const title = ref({})
const drawerOpen = async (row) => {
  title.value = row
  visibleDrawer.value = true
  if (row.id) {
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    imgUrl.value = formModel.value.coverImg
  } else {
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    await nextTick(() => {
      editor.value.setHTML('')
    })
  }
}

const uploadSuccess = (result) => {
  imgUrl.value = result.data
  formModel.value.coverImg = result.data
}

const imgUrl = ref('')
const editor = ref()

const emit = defineEmits(['success'])
const Publish = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (title.value.id) {
    await artEditService(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await artPublishService(formModel.value)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    //通知父组件添加成功
    emit('success', 'add')
  }
}
defineExpose({
  drawerOpen
})
</script>

<style scoped lang="scss">
.avatar-uploader {
  :deep {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
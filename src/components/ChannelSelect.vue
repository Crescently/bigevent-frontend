<template>
  <el-select :modelValue="modelValue" @update:modelValue="emit('update:cid', $event)">
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

<script setup>
import { artGetChannelsService } from '@/interface/article.js'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:cid'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>

<style scoped lang="scss"></style>
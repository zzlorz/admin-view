<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.hurui.me/logo.svg',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.hurui.me/logo.svg',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.hurui.me/logo.svg',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    src: 'https://fantastic-admin.hurui.me/logo.svg',
  },
]
</script>

<template>
  <div>
    <FaPageHeader title="图片预览" description="ImagePreview" />
    <FaPageMain>
      <ImagePreview src="https://fantastic-admin.hurui.me/logo.svg" :width="200" />
    </FaPageMain>
    <FaPageMain title="图片加载失败时">
      <ImagePreview src="http://www.baidu.com" width="100px" height="100px" />
    </FaPageMain>
    <FaPageMain title="结合 el-table 使用">
      <ElTable :data="tableData" style="width: 100%;">
        <ElTableColumn prop="date" label="日期" width="180" fixed="left" />
        <ElTableColumn prop="name" label="姓名" width="180" />
        <ElTableColumn prop="address" label="地址" />
        <ElTableColumn label="图片">
          <template #default="{ row }">
            <ImagePreview :src="row.src" width="100px" height="100px" />
          </template>
        </ElTableColumn>
      </ElTable>
    </FaPageMain>
  </div>
</template>

<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import eventBus from '@/utils/eventBus'
import Button from './components/button.vue'
import Checkbox from './components/checkbox.vue'
import Icon from './components/icon.vue'
import Input from './components/input.vue'
import InputNumber from './components/inputnumber.vue'
import Link from './components/link.vue'
import Radio from './components/radio.vue'
import Rate from './components/rate.vue'
import Select from './components/select.vue'
import Slider from './components/slider.vue'
import Switch from './components/switch.vue'

const components = {
  图标: Icon,
  按钮: Button,
  文字链接: Link,
  单选框: Radio,
  多选框: Checkbox,
  输入框: Input,
  数字输入框: InputNumber,
  选择器: Select,
  开关: Switch,
  滑块: Slider,
  评分: Rate,
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <FaPageHeader title="基础组件">
      <template #content>
        <div class="space-y-2">
          <p>框架内置 Element Plus 组件库，本页仅展示部分组件，更多组件及使用说明请查看 Element Plus 官网</p>
          <FaButton variant="link" class="h-auto p-0" @click="eventBus.emit('global-ui-component-switch')">
            不想使用 Element Plus ？
          </FaButton>
        </div>
      </template>
      <ElButton @click="open('https://element-plus.org/#/zh-CN')">
        <template #icon>
          <FaIcon name="i-ep:link" />
        </template>
        Element Plus 官网
      </ElButton>
    </FaPageHeader>
    <FaPageMain>
      <ElTabs type="border-card">
        <ElTabPane v-for="(item, key) in components" :key="key" :label="key">
          <component :is="item" />
        </ElTabPane>
      </ElTabs>
    </FaPageMain>
  </div>
</template>

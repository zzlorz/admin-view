<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'Copyright',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <footer v-if="settingsStore.settings.copyright.enable" class="copyright">
    <span>Copyright</span>
    <FaIcon name="i-ri:copyright-line" class="size-5" />
    <span v-if="settingsStore.settings.copyright.dates">{{ settingsStore.settings.copyright.dates }}</span>
    <template v-if="settingsStore.settings.copyright.company">
      <a v-if="settingsStore.settings.copyright.website" :href="settingsStore.settings.copyright.website" target="_blank" rel="noopener">{{ settingsStore.settings.copyright.company }}</a>
      <span v-else>{{ settingsStore.settings.copyright.company }}</span>
    </template>
    <a v-if="settingsStore.settings.copyright.beian" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">{{ settingsStore.settings.copyright.beian }}</a>
  </footer>
</template>

<style scoped>
.copyright {
  --uno: flex items-center justify-center flex-wrap my-4 px-4 text-sm text-secondary-foreground/50;

  span,
  a {
    --uno: px-1;
  }

  a {
    --uno: text-center no-underline hover-text-secondary-foreground transition;
  }
}
</style>

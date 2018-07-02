<template>
  <div
    v-show="$parent.swiping || id === $parent.currentActive"
    class="sy-tab-container-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sy-tab-container-item',

  props: ['id']
};
</script>

<style lang="less" scoped>
  .sy {
    &-tab-container-item {
      flex-shrink: 0;
      width: 100%;
      height:100%;
      overflow: hidden;
    }
  }
</style>

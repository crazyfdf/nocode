<template>
  <view>
    <uct-alert class="mt100" v-bind="item"></uct-alert>
  </view>
</template>

<script>
import item from './index.js';
export default {
  data() {
    return {
      item,
    };
  },
};
</script>

<style scoped lang="scss"></style>

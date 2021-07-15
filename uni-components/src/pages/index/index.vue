<template>
  <view>
    <uct-button class="mt100" v-bind="item"></uct-button>
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

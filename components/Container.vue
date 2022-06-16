<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container"
}
</script>

<style lang="scss" scoped>
@import '@/var.scss';

.container {
  margin-left: calc($SidebarWidth + 10px);
  margin-right: 20px;
  margin-top: 20px;
}
</style>

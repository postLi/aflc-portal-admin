<template>
  <div class="memebr-wrap">
    <iframe :src="url"  class="memberiframe" ref="myiframe" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'about:blank;'
    }
  },
  watch: {
    $route: {
      handler() {
        this.url = this.$const.INDEXURL + this.$route.meta.url
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.memebr-wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.memberiframe{
  width: 100%;
  height: 100%;
}
</style>

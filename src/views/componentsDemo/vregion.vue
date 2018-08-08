<template>
  <div class="component">
    <h2>选择城市</h2>
    <h4>默认样式</h4>
    <vregion @values="regionChange" />
    <h3>其它实例</h3>
    <vregion :ui="true" @values="regionChange" class="form-control">
      <button type="button" class="btn btn-default">
          选择城市 <i class="fa fa-fw fa-caret-down"></i>
      </button>
    </vregion>

    <blockquote>
      引用地址：
      @/components/vregion/Region.vue
    </blockquote>
    <h3>prop</h3>
    <p><a href="https://terryz.gitee.io/vue/#/region/demo" target="_blank">参考官方文档</a></p>
  </div>
</template>
<script>
import vregion from '@/components/vregion/Region.vue'

export default {
  components: {
    vregion
  },
  data() {
    return {
      url: 'http://aflc.oss-cn-shenzhen.aliyuncs.com//tms/JepzficX6twzc2F76MtED8kMC53pxQmH.png',
      url1: '',
      url2: '',
      url3: '',
      url4: ['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100']
    }
  },
  methods: {
    regionChange(data){
      console.log('data:',data)
    },
    getUrl(url) {
      console.log('upload Url:', url)
    }
  }
}
</script>

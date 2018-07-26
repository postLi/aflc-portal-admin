<template>
  <el-select ref="myautocomplete" @change="change" v-model="val" :placeholder="placeholder" v-bind="$attrs">
    <slot name="head"></slot>
    <template v-for="item in types">
      <!-- 将 `item` 对象作为一个插槽的 prop 传入。-->
      <slot v-bind:item="item">
        <!-- 回退的内容 -->
        <el-option :key="item.code" :label="item.name" :value="item.code"></el-option>
      </slot>
    </template>
    <slot name="foot"></slot>
  </el-select>
</template>
<script>
// 引入事件对象
import { eventBus } from '@/eventBus'
import { getSelectType } from '@/api/common'
import { mapGetters } from 'vuex'
import CACHE from '@/utils/cache'

/**
 * 可选的type值
AF018	车辆类型

 */

export default {
  name: 'selectType',
  props: {
    orgid: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [Number, String, Array]
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'otherinfo'
    ])
  },
  data() {
    return {
      val: '',
      types: [],
      dataCache: {

      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.val = newVal || ''
      },
      immediate: true
    }
  },
  mounted() {
    // 因为字典的数据修改频率极其小，
    // 尝试缓存以减少网络请求
    if (this.remote) {
      this.fetchData()
    } else {
      const data = CACHE.get(this.type)
      if (data === '') {
        this.fetchData()
      } else {
        this.types = data
      }
    }
    eventBus.$on('closepopbox', () => {
      console.log('closepopbox selectType:')
      this.$refs.myautocomplete.handleClose()
    })
  },
  methods: {
    fetchData() {
      var cb = (data) => {
        this.types = data
        // debugger
        CACHE.set(this.type, data)
      }
      if (this.dataCache[this.type]) {
        cb(this.dataCache[this.type])
      } else {
        getSelectType(this.type, this.orgid || this.otherinfo.companyId).then(cb)
      }
    },
    change(item) {
      this.$emit('change', item)
      this.$emit('input', this.val)
    }
  }
}
</script>

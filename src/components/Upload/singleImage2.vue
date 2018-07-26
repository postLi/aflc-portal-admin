<template>
    <div :class="{'hideUploadBtn': filelist.length >= limit}">
      <el-upload
        drag
        v-if="uploadUrl" 
        :data="upload" 
        :action="uploadUrl"
        :multiple="false" 
        list-type="picture-card"
        :show-file-list="showFileList" 
        :file-list="filelist"
        :limit="limit"
        :before-upload="beforeUpload"
        :on-preview="handlePictureCardPreview"
        :on-error="handleError"
        :on-exceed="onexceed"
        :on-success="handleImageScucess"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog lock-scroll custom-class="pop-show-img-wrapper" :visible.sync="dialogVisible">
        <img  class="pop-show-img" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
// 上传接口
import { getUploadPolicy } from '@/api/common'
import { parseTime } from '@/utils/'

export default {
  name: 'singleImageUpload',
  props: {
    value: [String, Array],
    title: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '（jpg/png。小于5M）'
    },
    size: {
      type: String,
      default: 'mini'
    },
    'showFileList': {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    listtype: {
      type: String,
      default: 'picture',
      enum: ['text', 'picture', 'picture-card']
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      tempUrl: '',
      dataObj: { token: '', key: '' },
      // 上传参数文档
      // https://help.aliyun.com/document_detail/31988.html
      upload: {
        'key': '', // 文件名称
        'policy': '',
        'OSSAccessKeyId': '',
        'success_action_status': '201', // 让服务端返回200,不然，默认会返回204;201会返回xml格式
        // 'callback': 'callbackbody',
        'signature': ''
      },
      uploadUrl: '',
      dir: '',
      filelist: []
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.showFileList) {
          let arr = Array.isArray(newVal) ? newVal : newVal ? newVal.split(',') : []
          arr = arr.filter(el => el)
          this.filelist = arr.map(el => {
            const obj = {}
            obj.url = el
            return obj
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
        // 从后台获取policy
      getUploadPolicy().then(data => {
        this.upload.OSSAccessKeyId = data.accessid
        this.upload.policy = data.policy
        this.upload.signature = data.signature
        this.uploadUrl = data.host
        this.dir = data.dir
        this.upload.key = data.dir + this.random_string() + type
      }).catch(err => {
      })
    },
    rmImage() {
      this.emitInput('')
    },
    // 超出上传数量
    onexceed(file, filelist) {
      this.$message.error(`最多上传 ${this.limit} 张!`)
    },
    // 删除列表
    handleRemove(file, fileList) {
      console.log('handleRemove:', file, fileList)
      this.filelist = fileList
      this.emitInput()
    },
    // 设置随机的文件名
    random_string(len) {
      　　len = len || 32
      　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      　　var maxPos = chars.length
      　　var pwd = ''
      　　for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    emitInput(val) {
      if (val) {
        this.filelist.push({
          url: val
        })
      }

      this.$emit('input', this.showFileList ? this.filelist.map(el => {
        return el.url
      }).join(',') : val)
    },
    handleImageScucess(xml) {
      let url = ''
      if (xml.indexOf('Location') !== -1) {
        url = xml.match(/<Location>([^<]+)<\/Location>/m)
        url = url ? url[1] : ''
      }
      this.emitInput(url)
      // this.imageUrl = url
    },
    handleError(err) {
      this.$emit('error', err)
    },
    beforeUpload(file) {
      const _self = this
      const isJPG = /image\/\w+/.test(file.type) && /(jpe?g|png)/i.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      let type = file.name.match(/([^\.]+)$/)
      type = type ? '.' + type[1] : ''

      return new Promise((resolve, reject) => {
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
          reject(false)
        } else if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!')
          reject(false)
        } else {
            // 设置文件名
          this.upload.key = this.dir + parseTime(new Date(), '{y}{m}{d}') + '/' + this.random_string() + type
          resolve(true)
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
.hideUploadBtn{
  div.el-upload.el-upload--picture-card{
    display: none;
  }
}
.pop-show-img-wrapper{
 .el-dialog__body{
   text-align: center;
   display: flex;
   align-items: center;
   justify-content: center;
 } 
}
.pop-show-img{
  max-width: 100%;
  max-height: 100%;
}
</style>

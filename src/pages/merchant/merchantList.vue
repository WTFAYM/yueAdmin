<template>
  <el-row style="padding: 10px;">
    <el-col :span="4" v-for="(item, index) in merchantData">
      <el-card style="margin: 1px;">
        <img v-lazy="item.imgUrl" class="image">
        <div class="merchantCont">
          <span>{{item.name}}</span>
          <div class="timeBox">
            加入时间:
            <!--<time class="time">{{ currentDate | formatDate }}</time>-->
            <time class="time">{{ item.addTimes}}</time>
          </div>
          <el-button type="text" class="button" @click="isShowDetailsData(index)">查看详情</el-button>
        </div>
      </el-card>
    </el-col>
    <!--查看详情-->
    <el-dialog :title="singleMerchantData.name" :visible.sync="isShowDetails" class="box">
      <el-row>
        <el-col :span="4">
          <el-upload class="avatar-uploader" :on-success="uploadSuccess"
                     :on-preview="previewPic"
                     action="https://jsonplaceholder.typicode.com/posts/">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-col>
        <el-col :span="20" class="topMessage">
          <div class="profile">简介：{{singleMerchantData.details['profiles']}}</div>
          <div class="address">地址：{{singleMerchantData.details['address']}}</div>
        </el-col>
      </el-row>
      <el-row class="details">
        <div class="title">详细信息</div>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import {dateFormat} from '../../assets/js/Utils'
  export default {
    data () {
      return {
        imageUrl: '',
        currentDate: new Date(),
        merchantData: [],
        isShowDetails: false,
        singleMerchantData: {
          details: {
            profiles: '',
            address: ''
          }
        }
      }
    },
    filters: {
      formatDate (time) {
        return dateFormat(time, 'yyyy-MM-dd')
      }
    },
    methods: {
      uploadSuccess (res, file) {
//        this.imageUrl = URL.createObjectURL(file.raw)
      },
      previewPic (file) {
//        this.imageUrl = file.url
      },
      getMerchantsData () {
//        this.axios.get('/api/merchantsData').then((res) => {
//          this.merchantData = res.data
//          console.log(res.data)
//        })
        this.merchantData = this.$store.state.data.merchantsList
      },
      isShowDetailsData (num) {
        this.isShowDetails = true
        this.singleMerchantData = this.merchantData[num]
        this.imageUrl = this.merchantData[num].imgUrl
      }
    },
    mounted () {
      this.getMerchantsData()
    }
  }
</script>

<style lang="scss" scoped>
  .image {
    width: 100%;
    display: block;
    -webkit-filter: contrast(150%);
    box-sizing: inherit;
  }

  .merchantCont {
    span {
      padding: 5px 0;
      display: block;
      font-size: 16px;
    }
    .timeBox {
      font-size: 0.9em;
      time {
        color: #7a7a7a;
      }
    }
    .button {
      float: right;
    }
  }

  .box {
    .avatar-uploader {
      text-align: center;
      width: 100px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .avatar {
        display: block;
        width: 100%;
        height: 100%;
      }
      .el-icon-plus {
        font-size: 20px;
        color: #8c939d;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
    }
    .avatar-uploader:hover {
      border: 1px dashed #20a0ff;
    }

    .topMessage {
      padding: 0 10px;
      height: 100px;
      .profile {
        margin-bottom: 5px;
      }
      .address {

      }
    }

    .details {
      margin-top: 10px;
      .title {
        border-bottom: 1px solid #bbb;
        padding: 5px 0;
        color: #000;
      }
    }
  }
</style>

<template>
  <section class="addGather">
    <div class="addGather-container">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
          <el-input v-model="title" :max="8">
            <template slot="prepend">标题:</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
          <p class="content-title">专栏内容</p>
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18">
          <p class="content-title">添加图片：</p>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <div class="toolbar addGatherFooter">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-button size="medium" type="success">添加专栏</el-button>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>

  export default {
    data () {
      return {
        title: '',
        content: '',
        imgUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
//        this.imageUrl = URL.createObjectURL(file)
      },
      beforeAvatarUpload (file) {
        this.imgUrl = URL.createObjectURL(file)
      }
    },
    created () {}
  }
</script>

<style lang="scss">
  .addGather {
    padding: 40px !important;
    .addGather-top {

    }
    .addGather-container {
      letter-spacing: 1px;
      .content-title {
        color: #ccc;
      }
      textarea {
        text-indent: 2em;
      }
    }
    .addGatherFooter {
      margin-top: 20px;
      .el-button {
        width: 100%;
      }
    }
    .avatar-uploader {
      text-align: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 400px;
      height: 150px;
      display: block;
    }
  }
</style>

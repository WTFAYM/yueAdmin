<template>
  <section class="Gather">

    <!--标签列表-->
    <el-table v-loading="listLoading" ref="multipleTable" @selection-change="selectGather" highlight-current-row
              :data="labelList"
              style="width: 100%;">
      <el-table-column type="expand">
        <!--通过props.row.属性来获取行属性-->
        <template slot-scope="props">
          <!--写一个活动的详细展示页-->
          <gather-item :item="props.row"></gather-item>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="ctime" label="发布时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条/分页-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click.native="batchRemove" :disabled="this.selectArr.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                     :total="total"
                     style="float:right;" :current-page="page"></el-pagination>
    </el-col>

    <!--编辑-->
    <el-dialog title="编辑" v-model="editFormVisible" class="editDialog">
      <el-input v-model="editGather" :max="8">
        <template slot="prepend">标题:</template>
      </el-input>
      <p>专栏内容</p>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="content">
      </el-input>
      <p>标签图标：</p>
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="editUrl" :src="editUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  import GatherItem from '../../components/GatherItem.vue'

  export default {
    components: {
      GatherItem
    },
    data () {
      return {
        imageUrl: '',
        total: 20,
        page: 1,
        pageSize: 10,
        listLoading: false,
        statNum: 0,
        endNum: 0,
        selectArr: [],
        editGather: '',  //编辑标题
        editUrl: '', //编辑图片
        content: '',//编辑内容
        editFormVisible: false,
        labelList: [
          {
            title: '致敬经典！',
            img: 'http://139.199.188.40/img/dog.jpg',
            content: '这里是测试内容',
            ctime: '2018-10-11 10:00'
          }
        ]
      }
    },
    methods: {
      editSubmit () {
        this.editFormVisible = false
        const loading = this.$loading({
          lock: true,
          text: '修改中....',
          spinner: '正在修改标签',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 3000)
      },
      addCancel () {
        this.addFormVisible = false
        this.addGather = ''
      },
      addSubmit () {
        this.addFormVisible = false
        const loading = this.$loading({
          lock: true,
          text: '添加中....',
          spinner: '正在填加标签',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 3000)
      },
      handleAvatarSuccess (res, file) {
//        this.editUrl = URL.createObjectURL(file)
      },
      beforeAvatarUpload (file) {
        this.editUrl = URL.createObjectURL(file)
      },
      selectGather (val) {
        this.selectArr = val
      },
      handleEdit (index, row) {
        this.editFormVisible = true
        this.editGather = row.title
        this.editUrl = row.img
        this.content = row.content
      },
      handleDelete (index, row) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        }).catch(() => {
        })
      },
      batchRemove () {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
          this.selectArr = []
          this.$refs.multipleTable.clearSelection()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
        })
      },
      handleCurrentChange (val) {
        this.page = val
      }
    }
  }
</script>

<style lang="scss">
  .Gather {
    padding: 40px;
    .label-icon {
      width: 50px;
      height: 50px;
    }
    .toolbar {
      background: #f2f2f2;
      padding: 10px;
      margin-bottom: 10px;
      .el-form-item {
        margin-bottom: 10px;
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
    .editDialog {
      .el-dialog {
        width: 80%;
      }
      .el-textarea__inner {
        text-indent: 2em;
        line-height: 120%;
        letter-spacing: 1px;
      }
    }
  }
</style>

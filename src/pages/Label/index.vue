<template>
  <section class="Label">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-button type="primary" @click="handleAdd">新增标签</el-button>
    </el-col>
    <!--标签列表-->
    <el-table v-loading="listLoading" ref="multipleTable" @selection-change="selectLabel" highlight-current-row
              :data="labelList"
              style="width: 100%; ">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="label" label="标签" width="120"></el-table-column>
      <el-table-column prop="icon" label="图标" width="130">
        <template slot-scope="scope">
          <img src="http://139.199.188.40/img/dog.jpg" class="label-icon">
        </template>
      </el-table-column>
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

    <!--新增-->
    <el-dialog title="新增" v-model="addFormVisible" :center="true">
      <el-input v-model="addLabel" :max="8">
        <template slot="prepend">标签:</template>
      </el-input>
      <p>标签图标：</p>
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑-->
    <el-dialog title="编辑" v-model="editFormVisible">
      <el-input v-model="editLabel" :max="8">
        <template slot="prepend">标签:</template>
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
  export default {
    data () {
      return {
        addLabel: '',
        addImg: '',
        addFormVisible: false,
        imageUrl: '',
        total: 20,
        page: 1,
        pageSize: 10,
        listLoading: false,
        statNum: 0,
        endNum: 0,
        selectArr: [],
        editLabel: '',
        editUrl: '',
        editFormVisible: false,
        editForm: {
          label: '',
          icon: '',
        },
        labelList: [
          {
            label: '其他',
            icon: ''
          }
        ]
      }
    },
    methods: {
      handleAdd () {
        this.addFormVisible = true
      },
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
        this.addLabel = ''
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
//        this.imageUrl = URL.createObjectURL(file)
      },
      beforeAvatarUpload (file) {
        this.imageUrl = URL.createObjectURL(file)
      },
      selectLabel (val) {
        this.selectArr = val
      },
      handleEdit (index, row) {
        this.editFormVisible = true
        this.editLabel = row.label
        this.editUrl = row.icon
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
  .Label {
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
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>

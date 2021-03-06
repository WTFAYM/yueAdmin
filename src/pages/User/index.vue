<template>
  <section class="cont">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getListByName">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table v-loading="listLoading" ref="multipleTable" @selection-change="selectUser" highlight-current-row
              :data="userList"
              style="width: 100%;">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="props">
          <img :src="props.row.avatar" class="userAvatar">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机" width="130"></el-table-column>
      <el-table-column label="生日" width="130">
        <template slot-scope="props">
          <span>{{props.row.birthday | DateTranDay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80">
        <template slot-scope="props">
          <span>{{props.row.gender | genderTran}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="个性签名"></el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="props">
          <span>{{props.row.state | stateTran}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
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
      <el-button type="danger" @click="batchRemove" :disabled="this.selectUserNum.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                     :total="total"
                     style="float:right;" :current-page="page"></el-pagination>
    </el-col>

    <!--编辑-->
    <el-dialog title="编辑" v-model="editFormVisible">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules">
        <div class="addAvatar">
          <span>头像</span>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleEditAvatarSuccess"
            :before-upload="beforeEditAvatarUpload">
            <img v-if="editForm.avatar" :src="editForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input class="mine-input" v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.gender">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="editForm.birthday" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机">
          <el-input class="mine-input" v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="editForm.state"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="editForm.summary" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        queryForm: {
          username: ''
        },
        userList: [],
        selectUserNum: [],
        total: 0,
        page: 1,
        pageSize: 10,
        listLoading: false,
//        编辑
        editFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        },
        editFormVisible: false,
        editLoading: false,
        currentEditForm: null,
        editForm: {
          avatar: '',
          username: '',
          gender: 1,
          phone: '',
          birthday: '',
          state: 0,
          summary: ''
        }
      }
    },
    methods: {
//      显示编辑界面
      handleEdit (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
        this.currentEditForm = Object.assign({}, this.editForm)
      },
      editSubmit () {
        this.listLoading = true
        if (!this.checkEdit()) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.editFormVisible = false
          this.listLoading = false
          return
        }
        let params = this.editForm
        params.birthday = tools.DateTranDay(params.birthday)
        this.$http.post('/api/user/update', params).then(res => {
          if (res.data.code == 200) {
            this.getList()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.editFormVisible = false
            this.listLoading = false
          }
        }, err => {
          this.$message({
            message: '数据异常',
            type: 'success'
          })
          this.listLoading = false
        })
      },
      checkEdit () {
        let result = false
        for (let key in this.currentEditForm) {
          if (key == 'birthday') {
            result = !(new Date(this.currentEditForm[key]).getTime() == new Date(this.editForm[key]).getTime())
            break
          } else if (this.currentEditForm[key] !== this.editForm[key]) {
            result = true
            break
          }
        }
        return result
      },
      handleDelete (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          this.$http.post('/api/user/delete', {uid: row.uid}).then(res => {
            if (res.data.code == 200) {
              this.getList()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          }, err => {
            this.$message({
              message: '服务器异常，请稍后再试',
              type: 'warning'
            })
            this.listLoading = false
          })
        })
      },
//      批量删除
      batchRemove () {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
          this.listLoading = true
          this.$http.post('api/user/deleteList', {uids: this.selectUserNum}).then(res => {
            if (res.data.code == '200') {
              this.selectUserNum = []
              this.$refs.multipleTable.clearSelection()
              this.getList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.listLoading = false
            }
          }, err => {
            this.$message({
              type: 'warning',
              message: '服务器异常，请稍后再试!'
            })
            this.listLoading = false
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '服务器异常，请稍后再试!'
            })
            this.listLoading = false
          })
        }).catch(() => {
        })
      },
      handleAdd () {
        this.addFormVisible = true
      },
      handleCurrentChange (val) {
        this.page = val
        this.listLoading = true
        this.getList()
      },
      handleAvatarSuccess (res, file) {
//        this.editUrl = URL.createObjectURL(file)
      },
      beforeAvatarUpload (file) {
        this.addForm.avatar = URL.createObjectURL(file)
      },
      handleEditAvatarSuccess () {

      },
      beforeEditAvatarUpload (file) {
        this.editForm.avatar = URL.createObjectURL(file)
      },
      getList () {
        this.$http.post('/api/user/list', {currentPage: this.page}).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.recordCount
            this.userList = res.data.data.data
            this.listLoading = false
          }
        }, err => {
          this.listLoading = false
          this.$message({
            type: 'warning',
            message: '服务器异常，请稍后再试!'
          })
        })
      },
      selectUser (val) {
        this.selectUserNum = val.map(val => val.uid)
      },
      getListByName () {
        let params = {
          conditions: {
            username_like: this.queryForm.username
          },
          orders: {
            uid: 'asc'
          },
          currentPage: 1
        }
        this.$http.post('/api/user/getListByName', params).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.recordCount
            this.userList = res.data.data.data
            this.listLoading = false
          }
        }, err => {
          this.listLoading = false
        })
      }
    },
    filters: {
      stateTran: function (val) {
        switch (val) {
          case 0:
            return '正常'
          case 1:
            return '封停'
        }
      },
      genderTran (val) {
        switch (val) {
          case 0:
            return '未知'
          case 1:
            return '男'
          case 2:
            return '女'
        }
      }
    },
    created () {
      this.listLoading = true
      this.getList()
    }
  }

</script>

<style lang="scss">
  .cont {
    padding: 10px;
    .toolbar {
      background: #f2f2f2;
      padding: 10px;
      margin-bottom: 10px;
      .el-form-item {
        margin-bottom: 10px;
      }
    }
    .mine-input {
      width: 193px;
    }

    .addAvatar {
      display: flex;
      align-items: center;
      padding-left: 40px;
      margin-bottom: 10px;
      span {
        display: inline-block;
      }
    }

    .userAvatar {
      width: 50px;
      height: 50px;
      margin: 0 auto;
      border-radius: 50%;
    }

    .userGender {

    }
    .avatar-uploader {
      display: inline-block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-left: 20px;

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
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: block;
    }

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>

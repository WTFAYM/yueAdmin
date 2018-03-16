<template>
  <section class="cont">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.name" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table v-loading="listLoading" @selection-change="selectUser" highlight-current-row :data="userInfo"
              style="width: 100%;">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex === 'm' ? '男' : '女' }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="手机">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="time" label="时间" width="155"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      >
      <el-table-column prop="phone" label="手机" width="130"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
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
      <el-button type="danger" @cilck="batchRemove" :disabled="this.selectUserNum.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                     :total="total"
                     style="float:right;" :current-page="page"></el-pagination>
    </el-col>

    <!--新增-->
    <el-dialog title="新增" v-model="addFormVisible">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules">
        <el-form-item label="姓名" prop="username">
          <el-input class="mine-input" v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="'m'">男</el-radio>
            <el-radio class="radio" :label="'f'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addForm.age" :min="0" :max="150"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="addForm.birthday" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机">
          <el-input class="mine-input" v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addForm.address" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑-->
    <el-dialog title="编辑" v-model="editFormVisible">
      <el-form :model="editForm" label-width="80px" :rules="addFormRules">
        <el-form-item label="姓名" prop="username">
          <el-input class="mine-input" v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="'m'">男</el-radio>
            <el-radio class="radio" :label="'f'">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="150"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="editForm.birthday" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机">
          <el-input class="mine-input" v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit" :loading="editLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        queryForm: {
          name: ''
        },
        userInfo: [],
        selectUserNum: [],
        total: 0,
        page: 1,
        pageSize: 10,
        listLoading: false,
        statNum: 0,
        endNum: 0,
//        新增界面数据
        addFormRules: {
          username: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        addForm: {
          username: '',
          sex: 'm',
          age: 0,
          phone: '',
          birthday: '',
          address: ''
        },
//        是否显示新增窗口
        addFormVisible: false,
        addLoading: false,
//        编辑
        editFormVisible: false,
        editLoading: false,
        editForm: {
          username: '',
          sex: 'm',
          age: 0,
          phone: '',
          birthday: '',
          address: ''
        }
      }
    },
    methods: {
//      显示编辑界面
      handleEdit (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
      },
      editSubmit () {
        this.editFormVisible = false
      },
      handleDelete (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
//          this.listLoading = true
//          请求删除
          this.$message({
            message: '删除成功',
            type: 'success'
          })
//          this.getUsers()
        })
      },
//      批量删除
      batchRemove () {},
      handleAdd () {
        this.addFormVisible = true
      },
      handleCurrentChange (val) {
        this.page = val
        this.getUserData()
      },
      getUserData () {
        this.listLoading = true
        let para = {
          page: this.page
        }
        this.$http.post('/api/getUserData', para).then((res) => {
          this.startNum = (para.page - 1) * this.pageSize
          if (para.page * this.pageSize < this.total) {
            this.endNum = para.page * this.pageSize
          } else {
            this.endNum = this.total
          }
          let data = res.data.slice(this.startNum, this.endNum)
          this.userInfo = data
          this.total = res.data.length
          this.listLoading = false
        })
      },
      selectUser (selectUserNum) {
        this.selectUserNum = selectUserNum
      }
    },
    mounted () {
      this.getUserData()
    },
    created () {
      this.getUserData()
    }
  }

</script>

<style lang="scss" scoped>
  .cont {
    /*width: 100%;*/
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
</style>

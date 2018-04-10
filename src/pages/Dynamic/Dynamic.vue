<template>
  <section class="Dynamic">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.name" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table v-loading="listLoading" ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="expand">
        <!--通过props.row.属性来获取行属性-->
        <template slot-scope="props">
          <!--写一个活动的详细展示页-->
          <dynamic-item :List="props.row"></dynamic-item>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条/分页-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click.native="batchRemove" :disabled="this.selectUserNum.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                     :total="total"
                     style="float:right;" :current-page="page"></el-pagination>
    </el-col>
  </section>
</template>

<script type="text/ecmascript-6">
  import DynamicItem from '../../components/DynamicItem.vue'

  export default {
    components: {
      DynamicItem
    },
    data () {
      return {
        queryForm: {
          name: ''
        },
        selectUserNum: [], //记录选中项
        total: 20,
        page: 1,
        pageSize: 10,
        listLoading: false,
        statNum: 0,
        endNum: 0,
        tableData3:
          [
            {
              id: 1,
              ctime: '2016-05-03',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-03',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-03',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-03',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-03',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-03',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-02',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-04',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-01',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-08',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-06',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            },
            {
              ctime: '2016-05-07',
              username: '王小虎',
              title: '上海市普陀区金沙江路 1518 弄',
              max: '20'
            }],
      }
    },
    methods: {
      search () {
        console.log(this.queryForm.name)

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
          this.selectUserNum = []
          this.$refs.multipleTable.clearSelection()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
        })
      },
      handleAdd () {
        this.addFormVisible = true
      },
      handleCurrentChange (val) {
        this.page = val
      },
      getData () {
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
      handleSelectionChange (val) {
        this.selectUserNum = val
      }
    }
  }
</script>
<style lang="scss" scoped>
  .Dynamic {
    padding: 10px;
  }
</style>

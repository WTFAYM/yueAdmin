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
    <el-table v-loading="listLoading" ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
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
        <template slot-scope="scope">{{ scope.row.ctime | DateTran }}</template>
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
      <el-button type="danger" @click.native="batchRemove" :disabled="this.selectNum.length===0">批量删除</el-button>
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
        selectNum: [], //记录选中项
        total: 0,
        page: 1,
        pageSize: 10,
        listLoading: false,
        statNum: 0,
        endNum: 0,
        list: []
      }
    },
    created () {
      this.listLoading = true
      this.getList()
    },
    methods: {
      search () {
        let params = {
          username: this.queryForm.name
        }
        this.$http.post('api/dynamic/getDynamicByUser', params).then(res => {
          if (res.data.code == 200) {
            this.total = res.data.data.recordCount
            this.list = res.data.data.data
            this.listLoading = false
          }
        }, err => {
          this.listLoading = false
        })
      },
      handleDelete (index, row) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
          删除请求
          this.listLoading = true
          this.$http.post('api/dynamic/delete', {aid: row.did}).then(res => {
            if (res.data.code == '200') {
              this.$message({
                message: '删除成功!',
                type: 'success'
              })
              this.getList()
            }
          }, err => {
          })
        }).catch(() => {
        })
      },
      batchRemove () {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
          this.$http.post('api/dynamic/deleteList', {dids: this.selectNum}).then(res => {
            if (res.data.code == '200') {
              this.selectNum = []
              this.$refs.multipleTable.clearSelection()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            }
          }, err => {
            console.log(err)
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
      getList () {
        let para = {
          currentPage: this.page
        }
        this.$http.post('/api/dynamic/list', para).then((res) => {
          if (res.data.code == 200) {
            this.total = res.data.data.recordCount
            this.list = res.data.data.data
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
      handleSelectionChange (val) {
        this.selectNum = val.map(item => item.did)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .Dynamic {
    padding: 10px;
  }
</style>

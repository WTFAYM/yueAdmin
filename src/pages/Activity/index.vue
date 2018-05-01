<template>
  <section class="Activity">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="queryForm">
        <el-form-item>
          <el-input v-model="queryForm.name" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
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
          <active-item :List="props.row"></active-item>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">{{ scope.row.ctime | DateTran }}</template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="max" label="人数" width="120"></el-table-column>
      <el-table-column prop="title" label="活动名称" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="80">
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
  import ActiveItem from '../../components/ActiveItem.vue'

  export default {
    components: {
      ActiveItem
    },
    data () {
      return {
        queryForm: {
          name: ''
        },
        selectNum: [],
        total: 0,
        page: 1,
        pageSize: 10,
        listLoading: false,
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
        this.$http.post('api/active/getActiveByUser', params).then(res => {
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
//          删除请求
          this.listLoading = true
          this.$http.post('api/active/delete', {aid: row.aid}).then(res => {
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
          this.listLoading = false
        })
      },
      batchRemove () {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
          this.$http.post('api/active/deleteList', {aids: this.selectNum}).then(res => {
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
        })
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
        this.$http.post('/api/active/activeList', para).then((res) => {
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
        this.selectNum = val.map(val => val.aid)
      }
    }
  }
</script>
<style lang="scss">
  .Activity {

  }
</style>
<style lang="scss" scoped>
  .Activity {
    padding: 10px;
  }
</style>

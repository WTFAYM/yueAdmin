<template>
  <section class="Tree">

    <!--树洞列表-->
    <el-table v-loading="listLoading" ref="multipleTable" @selection-change="selectTree" highlight-current-row
              :data="treeList"
              style="width: 100%; ">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column label="发布时间" width="200">
        <template slot-scope="scope">{{ scope.row.ctime | DateTran }}</template>
      </el-table-column>
      <el-table-column prop="content" label="内容">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
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
  </section>
</template>
<script>
  export default {
    data () {
      return {
        total: 0,
        page: 1,
        pageSize: 10,
        listLoading: false,
        statNum: 0,
        endNum: 0,
        selectArr: [],
        treeList: []
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let params = {
          currentPage: this.page
        }
        this.$http.post('api/tree/list', params).then(res => {
          if (res.data.code == '200') {
            this.total = res.data.data.recordCount
            this.treeList = res.data.data.data
            this.listLoading = false
          }
        }, err => {
          console.log(err)
          this.listLoading = false
        })
      },
      selectTree (val) {
        this.selectArr = val.map(item => {
          return item.tid
        })
      },
      handleDelete (index, row) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
//          删除请求
          this.listLoading = true
          this.$http.post('api/tree/delete', {tid: row.tid}).then(res => {
            if (res.data.code == '200') {
              this.$message({
                message: '删除成功!',
                type: 'success'
              })
              this.getList()
            }
          }, err => {
            console.log(err)
            this.listLoading = false
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
          this.listLoading = true
          this.$http.post('api/tree/deleteList', {tids: this.selectArr}).then(res => {
            if (res.data.code == '200') {
              this.selectArr = []
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
      handleCurrentChange (val) {
        this.page = val
        this.listLoading = false
        this.getList()
      }
    }
  }
</script>

<style lang="scss">
  .Tree {

  }
</style>

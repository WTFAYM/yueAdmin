<template>
  <section class="Comment">
    <!--评论列表-->
    <el-table v-loading="listLoading" ref="multipleTable" @selection-change="selectComment" highlight-current-row
              :data="treeList"
              style="width: 100%; ">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="username" label="用户"></el-table-column>
      <el-table-column label="发布时间" width="200">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.state }}</template>
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
        total: 20,
        page: 1,
        pageSize: 10,
        listLoading: false,
        statNum: 0,
        endNum: 0,
        selectArr: [],
        treeList: [
          {
            username: '小胡',
            ctime: '2015-04-02 12:00',
            content: '好累啊',
            state: '0'
          },
          {
            username: '小订',
            ctime: '2015-04-02 12:00',
            content: '好累啊',
            state: '1'
          }
        ]
      }
    },
    methods: {
      selectComment (val) {
        this.selectArr = val
      },
      handleDelete (index, row) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          ancelButtonText: '取消',
        }).then(() => {
//          删除请求
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
  .Comment {

  }
</style>

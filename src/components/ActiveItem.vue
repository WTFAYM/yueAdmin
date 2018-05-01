<template>
  <div class="ActiveItem" v-if="List!=null">
    <div class="ActiveItem-left">
      <div class="ActiveItem-img">
        <img v-lazy="List.img">
      </div>
      <div class="ActiveItem-base">
        <div class="ActiveItem-detail"><span class="ActiveItem-title lt4">活动标题</span><span class="ActiveItem-value">{{List.title}}</span>
        </div>
        <div class="ActiveItem-detail">
          <span class="ActiveItem-title lt3">创建人</span><span class="ActiveItem-value">
          <a>{{List.username}}</a></span>
        </div>
        <div class="ActiveItem-detail"><span class="ActiveItem-title lt2">标签</span><span
          class="ActiveItem-value">{{List.label}}</span>
        </div>
        <div class="ActiveItem-detail"><span class="ActiveItem-title lt4">创建时间</span><span
          class="ActiveItem-value">{{List.ctime | DateTran}}</span>
        </div>
      </div>
    </div>
    <div class="ActiveItem-right">
      <div class="ActiveItem-info">
        <div class="ActiveItem-detail"><span class="ActiveItem-title lt4">开始时间</span><span
          class="ActiveItem-value">{{List.start | DateTran}}</span>
        </div>
        <div class="ActiveItem-detail"><span class="ActiveItem-title lt4">结束时间</span><span
          class="ActiveItem-value">{{List.end | DateTran}}</span>
        </div>
      </div>
      <div class="ActiveItem-member">
        <p>活动成员:<span>{{userList.length}}/{{List.max}}</span></p>
        <div class="ActiveItem-member-list">
          <span v-for="(item,index) in userList" :key="index" class="memberList-item"
                @click="toUser(index)">{{item.username}}</span>
        </div>
      </div>
      <div class="ActiveItem-content">
        <p>活动简介:</p>
        <div class="ActiveItem-content-detail">
          <span>{{List.content}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'List',
    data () {
      return {
        userList: []
      }
    },
    props: ['List'],
    created () {
      console.log(this.List)
      this.$http.post('api/actUser/getMember', {aid: this.List.aid}).then(res => {
        if (res.data.code == '200') {
          console.log(res)
          this.userList = res.data.data
        }
      }, err => {
        console.log(err)
      })
    },
    methods: {
      toUser (uid) {
        console.log(uid)
      }
    }
  }
</script>

<style lang="scss">
  .ActiveItem {
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    .ActiveItem-left {
      width: 45%;
      .ActiveItem-img {
        width: 90%;
        margin: 10px auto;
        img {
          max-width: 100%;
        }
      }
      .ActiveItem-base {
        padding: 5%;
      }
    }
    .ActiveItem-right {
      width: 45%;
      .ActiveItem-info {
      }
      .ActiveItem-member {
        p {
          font-weight: bold;
          span {
            margin-left: 20px;
            color: #ccc;
          }
        }
        .ActiveItem-member-list {
          &::-webkit-scrollbar {
            display: none;
          }
          height: 100px;
          overflow-y: scroll;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
        }
        .memberList-item {
          padding: 5px 10px;
          background: #fff;
          color: #000;
          border: 1px solid #ccc;
          border-radius: 3px;
          margin: 10px 5px;
          display: inline-block;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .ActiveItem-content {
        p {
          font-weight: bold;
        }
        .ActiveItem-content-detail {
          height: 100px;
          border: 1px solid #ccc;
          border-radius: 5px;
          overflow-y: scroll;
          padding: 10px;
          &::-webkit-scrollbar {
            display: none;
          }
          span {
            text-indent: 2em;
            display: block;
            text-align: left;
            line-height: 130%;
            letter-spacing: 1px;
          }
        }
      }
    }
    .ActiveItem-detail {
      margin: 5px 0;
      display: flex;
    }
    .ActiveItem-title {
      font-weight: bold;
      display: block;
      width: 6.7em;
      margin-right: -2.3em;
    }
    .ActiveItem-value {
      color: #ccc;
      margin-left: 1em;
      a {
        text-decoration: underline;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .lt4 {
      letter-spacing: 0.1em;
    }
    .lt3 {
      letter-spacing: 0.65em;
    }
    .lt2 {
      letter-spacing: 2.3em;
    }
  }
</style>

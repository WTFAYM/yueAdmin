<template>
  <section style="height: 100%">
    <transition name="slide-right">
      <div class="chatting">
        <!-- 聊天界面头部 -->
        <div class="chatting-header">
          <div class="chatting-title">
            <h2>客服机器人</h2>
          </div>
        </div>

        <!-- 聊天内容区域 -->
        <div ref="chattingContent" id="chattingContent" class="chatting-content">
          <div class="chatTip">
            很高兴为您服务~
          </div>
          <div v-for="item in msg">

            <div v-if="item.self" class="chatting-item self clear">
              <div class="msg-date">
              </div>
              <div class="msg-from">
                <span class="loc"></span>
                <span class="msg-author">Admin</span>
                <img src="https://icdn.microzz.com/20170426_vue_chat/icon-avatar8.svg" alt="">
              </div>
              <div class="msg-content">{{item.content}}</div>
            </div>

            <div v-else class="chatting-item other clear">
              <div class="msg-date">
              </div>
              <div class="msg-from">
                <img src="https://icdn.microzz.com/20170426_vue_chat/icon-avatar1.svg" alt="">
                <span class="msg-author">校园助手</span>
              </div>
              <div class="msg-content">{{item.content}}</div>
            </div>
          </div>
        </div>
        <!-- 输入区域 -->
        <div class="chatting-input">
          <input @keyup.enter="send" v-model.trim="inputContent" placeholder="校园助手，在线聊天！">
          <button @click="send">发送</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        msg: [],
        inputContent: '',
        oContent: {}
      }
    },
    methods: {
      send () {
        this.oContent.scrollTop = this.oContent.scrollHeight
        if (this.inputContent === '') {
          return
        } else {
          this.msg.push({
            content: this.inputContent,
            self: true
          })
          setTimeout(() => {
            this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight
          }, 0)
        }
        let para = {
          'key': 'a7c164d6200c4dca9793117efcd453bf',
          'info': this.inputContent,
          'userid': '1'
        }
        this.$http({
          url: '/openapi/api',
          method: 'post',
          data: para,
          withCredentials: true
        }).then(res => {
          this.msg.push({
            content: res.data.text,
            self: false
          })
          this.inputContent = ''
        }).then(() => {
          setTimeout(() => {
            this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight
          }, 0)
        })
      }
    },
    watch: {
//      '$route' (to, from) {
//        this.msg = []
//      }
    },
    mounted () {
      this.oContent = document.getElementById('chattingContent')
      setTimeout(() => {
        this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight
      }, 0)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/common";

  $blue: #2196f3;
  .chatting {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .chatting-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      width: 100%;
      background-color: $blue;
      color: white;
      padding-left: 10px;
      padding-right: 15px;
      .chatting-title {
        margin: 0 auto;
        i.icon-group {
          vertical-align: top;
          width: 30px;
          height: 30px;
          background-size: contain;
          margin-right: 3px;
        }
      }
    }
    .chatting-content {
      flex: 1;
      width: 100%;
      background-color: rgba(0, 0, 0, .1);
      overflow: auto;
      .chatTip {
        background: #fff;
        padding: 20px;
        width: 60%;
        margin: 10px auto;
        text-align: center
      }
      .chatting-item {
        padding: 10px;
        /*width: 100%;*/
        .msg-date {
          text-align: center;
          color: gray;
          font-size: 80%;
        }
        .msg-from {
          display: flex;
          align-items: center;
          span.loc {
            color: gray;
            font-size: 60%;
            margin-right: 5px;
          }
          .msg-author {
            font-size: 1.2rem;
          }
          img {
            width: 30px;
            height: 30px;
            border-radius: 15px;
          }
        }
        .msg-content {
          margin-top: 5px;
          background-color: white;
          width: 200px;
          padding: 6px 10px;
          border-radius: 10px;
        }
      }
      .chatting-item + .chatting-item {
        margin-top: 10px;
      }
      .self {
        .msg-from {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          img {
            margin-left: 10px;
          }
        }
        .msg-content {
          float: right;
          word-wrap: break-word;
          word-break: break-all;
          margin-right: 10px;
        }
      }
      .other {
        .msg-from {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          img {
            margin-right: 10px;
          }
        }
        .msg-content {
          float: left;
          margin-left: 10px;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .online {
        width: 200px;
        // max-width: 100%;
        margin: 3px auto;
        border-radius: 4px;
        text-align: center;
        background-color: #FFFDE7;
      }
    }
    .chatting-input {
      display: flex;
      height: 40px;
      width: 100%;
      input {
        flex: 1;
        padding-left: 10px;
        border: 0;
        font-size: 1.3rem;
      }
      button {
        width: 100px;
        border: 0;
        background-color: $blue;
        color: white;
        font-size: 1.2rem;
      }
    }
  }
</style>

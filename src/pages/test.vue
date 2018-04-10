<template>
  <div class="hello">
    <h1 @click="show">{{ msg }}</h1>
    <rich-text-editor :text="content" @editorChange="editorChange">
    </rich-text-editor>
  </div>
</template>

<script>
  import richTextEditor from '../components/richTextEditor.vue'

  export default {
    components: {richTextEditor},
    data () {
      return {
        msg: 'Welcome to image upload demo',
        content: ''
      }
    },
    methods: {
      editorChange: function (html) {
        this.content = html
      },
      show () {
        console.log(this.content)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

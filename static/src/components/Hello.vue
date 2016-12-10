<template>
  <div class="hello">
    <h1>I'm the parent!!!</h1>
    <upload @addFile="addFile"></upload>
    <hr>
    <ul>
      <li v-for="file in files">
        {{ file.path }}
      </li>
    </ul>
  </div>
</template>

<script>
import upload from './upload.vue'

export default {
  data () {
    return {
      files: [{ path: './youpidou.youpi', date: new Date()}]
    }
  },
  components: {
    upload
  },
  methods:{
    addFile(item){
      this.files.push(item)
      this.upload(item)
      //console.log(item)
    },
    upload(item) {
      console.log('upload', item)
    }
  }
}
</script>

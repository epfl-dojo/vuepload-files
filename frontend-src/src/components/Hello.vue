<template>
  <div class="hello">
    <h1>Upload page</h1>
    <p>(parent component)</p>
    <hr>
    <upload @addFile="addFile"></upload>
    <hr>
    <h2>File list: (todo)</h2>
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
  created() {
    var that = this;
    var socket = io.connect('http://localhost:3000')
    io.origins = 'http://*:3000'

    socket.on('files', function (data) {
      console.log('files emited from server', data)
      that.files = data
    })
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

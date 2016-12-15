<template>
  <div>
    <div>
      <h1>Upload page</h1>
      <hr>
      <upload @addFile="addFile"></upload>
    </div>
    <hr>
    <transition name="bounce">
      <div v-show="!isEmpty">
        <h2>File list: (todo)</h2>
        <transition-group name="list" tag="ul" class="list-group">
          <li v-for="file in files"  class="list-group-item" :key="file.path">
            <a :href="apiGetFile(file)">{{ file.path }}</a>  <button type="button" class="btn btn-xs btn-danger pull-right" @click="remove(file)">Delete</button>
          </li>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import upload from './upload.vue'

export default {
  data () {
    return {
      files: []
    }
  },
  computed: {
    isEmpty() {
      return this.files.length === 0
    }
  },
  created() {
    var that = this;
    var socket = io.connect('http://localhost:3000')
    //io.origins = 'http://*:3000'

    socket.on('files', function (data) {
      console.log('files emited from server', data)
      that.files = data
    })
  },
  components: {
    upload
  },
  methods:{
    apiGetFile(file){
      return '/api/get/' + file.path
    },
    addFile(item){
      this.files.push(item)
      this.upload(item)
      //console.log(item)
    },
    upload(item) {
      console.log('upload', item)
    },
    remove(file){
      axios.get('api/delete/'+file.path)
        .then(function (res) {
          console.log('sent delete request')
        })
        .catch(function (err) {
          console.log('error')
        })
    }
  }
}
</script>

<style>
  .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>

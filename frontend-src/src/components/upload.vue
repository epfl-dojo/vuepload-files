<template>
  <div>
    <div class="input-group">
      <label class="input-group-btn">
        <span class="btn btn-primary">
          Browse<input id="avatar" name="avatar" type="file" class="form-control" @change="selection" style="display: none;"/>
        </span>
      </label>
      <input type="text" class="form-control" v-model="selectedFile" readonly>
      <span class="input-group-btn">
        <button type="button" class="btn btn-danger" @click="remove" :disabled="isNotSelected">Delete</button>
        <button type="button" class="btn btn-primary" @click="send" :disabled="isNotSelected">Upload</button>
      </span>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        selectedFile: ''
      }
    },
    computed: {
       isNotSelected(){
        return this.selectedFile === ''
      }
    },
    methods:{
      remove() {
        this.selectedFile = ''
      },
      selection(ev) {
        this.selectedFile = ev.target.files[0].name
      },
      send(){
        var self = this
        var data = new FormData();
        data.append('avatar', document.getElementById('avatar').files[0]);
        var config = {
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          },
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
        axios.post('api/file', data, config)
        .then(function (res) {
          console.log('sent')
          self.remove()

        })
        .catch(function (err) {
          console.log('error')
          self.remove()
        })
      }      
    }
  }
</script>
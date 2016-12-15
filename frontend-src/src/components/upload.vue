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
        <button type="button" class="btn btn-warning" @click="remove" :disabled="isNotSelected">Reset</button>
        <button type="button" class="btn btn-success" @click="send" :disabled="isNotSelected">Upload</button>
      </span>
    </div>
    <div v-show ="uploading" class="progress">
      <div class="progress-bar progress-bar-striped active" role="progressbar" :aria-valuenow="percentCompleted" aria-valuemin="0" aria-valuemax="100" 
            :style="{width: percentCompleted+'%'}">
        {{ percentCompleted }}%
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        selectedFile: '',
        percentCompleted: 0
      }
    },
    computed: {
       isNotSelected(){
        return this.selectedFile === ''
      },
      uploading() {
        return this.percentCompleted > 0
      }
    },
    methods:{
      remove() {
        this.selectedFile = ''
        this.percentCompleted = 0
      },
      selection(ev) {
        this.selectedFile = ev.target.files[0].name
      },
      send(){
        this.selectedFile = ''
        var self = this
        var data = new FormData();
        data.append('avatar', document.getElementById('avatar').files[0]);
        var config = {
          onUploadProgress: function(progressEvent) {
            self.percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          },
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }        
        axios.post('api/upload', data, config)
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
<template>
  <div>
    <form role="form" class="form" onsubmit="return false;">
      <div class="form-group">
        <label for="file">File</label>
        <input id="avatar" name="avatar" type="file" class="form-control"/>
      </div>
      <button id="upload" type="button" class="btn btn-primary" @click="send">Upload</button>
    </form>

    <div id="output" class="container"></div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        file: {}
      }
    },
    methods:{
      send(){
        var data = new FormData();
          data.append('avatar', document.getElementById('avatar').files[0]);
          var config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          };
          axios.post('api/file', data, config)
            .then(function (res) {
              console.log('sent')
            })
            .catch(function (err) {
              console.log('error')
            });
      }      
    }
  }
</script>
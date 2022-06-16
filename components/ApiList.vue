<template>
  <Container>
    <div class="top-line">
      <div class="top-line-left">
        <input v-show="!this.isEditMode" type="file" accept="application/json" @change="onChangeFile">
      </div>
      <div class="top-line-right">
        <div v-if="this.isEditMode">
          <button @click="onClickDownload">JSON 다운로드</button>
          <button @click="onClickToggleEditMode">일반 모드로</button>
        </div>
        <div v-else>
          <button @click="onClickToggleEditMode">편집 모드로</button>
        </div>
      </div>
    </div>

    <br v-if="!this.isEditMode">

    <EditWarning v-if="this.isEditMode"></EditWarning>

    <div v-if="!this.isEditMode" class="table-description">
      <div><h3>현재 구동중인 MOCK API 리스트</h3></div>
      <div>Base URL : localhost:{{port}}/api/</div>
    </div>

    <table>
      <thead>
        <tr>
          <th v-if="this.isEditMode" class="remove"></th>
          <th class="method method-top">메소드</th>
          <th class="url url-top">URL</th>
          <th class="response response-top">
            응답
          </th>
        </tr>
      </thead>
      <tbody v-if="this.isEditMode">
        <tr v-for="(api, index) in this.apiListEditMode">
          <button class="remove" @click="onClickRemove(index)">제거</button>
          <select class="method" v-model="api.method">
            <option value="get">get</option>
            <option value="post">post</option>
            <option value="patch">patch</option>
            <option value="delete">delete</option>
            <option value="put">put</option>
          </select>
          <input class="url" v-model="api.url">
          <textarea style="height: 200px; width: 100%;" v-model="api.response"></textarea>
        </tr>
        <button class="table-bottom-button" @click="onClickAdd">추가</button>
        <div class="table-bottom-description">
          JSON 다운로드 버튼을 통해 현재 상태를 json 파일로 다운로드 가능합니다
        </div>
      </tbody>
      <tbody v-else>
        <div v-if="this.apiList.length == 0" style="width: 100%; text-align: center; margin-top: 20px;">
          현재 구동중인 API가 없습니다
        </div>
        <tr v-else v-for="(api, index) in this.apiList">
          <td class="method">{{api.method}}</td>
          <td class="url">{{api.url}}</td>
          <td class="response">
            <textarea style="height: 200px; width: 100%;" disabled v-model="api.response"></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </Container>
</template>

<script>
import axios from "axios"

export default {
  name: "ApiList",
  data: function(){
    return {
      isEditMode: false,
      apiList: [],
      apiListEditMode: [],
      apiListJsonString: null,
      port: null,
    }
  },
  mounted() {
    this.port = process.env.PORT
    axios.post('http://localhost:' + process.env.PORT + '/api/command/stop', {})
  },
  methods: {
    onChangeFile(event){
      const $self = this
      try {
        let reader = new FileReader();
        reader.onload = function(e) {
          $self.apiListJsonString = JSON.stringify(JSON.parse(e.target.result))
          $self.search()
        }
        reader.readAsText(event.target.files[0], 'utf-8');
      } catch(e){
        console.error(e);
        alert('파일이 잘못되었거나, 존재하지 않습니다. 모든 응답은 JSON형식을 만족해야 합니다.')
      }
    },
    onClickAdd(){
      this.apiListEditMode.push({
        method: 'get',
        url: '',
        response: '{}'
      })
    },
    onClickRemove(idx){
      this.apiListEditMode.splice(idx, 1);
    },
    onClickDownload(){
      if(this.apiListEditMode.length < 1){
        alert('API 리스트가 비어있습니다.')
        return
      }
      let jsonFileString = 'data:application/json;charset=utf-8,' + JSON.stringify(this.apiListEditMode)
      var x = document.createElement('A')
      x.setAttribute('href', jsonFileString)
      x.setAttribute('download', 'WMS_Swagger.json')
      document.body.appendChild(x)
      x.click()
    },
    onClickToggleEditMode(){
      if(this.isEditMode){
        if(confirm('일반 모드로 돌아가면 현재 편집사항은 모두 사라집니다. 편집하신 내용을 보존하려면 JSON 다운로드 버튼을 이용하세요') == false){
          return
        }
      }

      this.isEditMode = !this.isEditMode
      if(this.isEditMode){
        this.apiListEditMode = JSON.parse(JSON.stringify(this.apiList))
      } else {
        this.apiListEditMode = null
      }
      if(this.isEditMode == false && this.apiListJsonString){
        this.search()
      }
    },
    search(){
      const $self = this
      axios.post('http://localhost:' + process.env.PORT + '/api/command/refresh', {
        jsonString: $self.apiListJsonString
      }).then(response => {
        this.apiList = response.data.data
      }).catch(error => {
        alert('파일이 잘못되었거나, 존재하지 않습니다. 모든 응답은 JSON형식을 만족해야 합니다.')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/var.scss';

.table-description {
  text-align: center;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border-bottom: 2px solid black;
}
tr {
  display: flex;
}

.top-line {
  display: flex;
  justify-content: space-between;

  &-left {
  }
  &-right {
  }
}

.file-path-input {
  width: 500px;
  min-width: 300px;
}

.url {
  width: 30%;

  &-top {
    user-select: none;
  }
}
.remove {
  width: 5%;
  text-align: center;
}
.method {
  width: 10%;
  text-align: center;

  &-top {
    user-select: none;
  }
}
.response {
  width: 55%;

  &-top {
    user-select: none;
  }
}
.table-bottom-button {
  background-color: $SidebarBgColor;
  color: white;
  width: 100%;
}
.table-bottom-description {
  text-align: center;
  margin-top: 30px;
}
</style>

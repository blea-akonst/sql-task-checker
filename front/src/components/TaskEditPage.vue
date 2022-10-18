<template>
  <div class="container" style="margin-top: 70px;">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div>
          <form>
            <div class="form-group">
              <div v-if="id !== 'new'">
                <label for="id">ID</label>
                <input v-model="id" type="text" name="id" :disabled="true" class="form-control" id="id" aria-describedby="idHelp"><br>
              </div>

              <label for="name">Название</label>
              <input v-model="name" type="text" name="name" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Введите название">
              <small id="nameHelp" class="form-text text-muted">Введите название задачи</small><br><br>

              <label for="name">Запрос</label>
              <input v-model="right_query" type="text" name="name" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Введите запрос">
              <small id="nameHelp" class="form-text text-muted">Введите корректный запрос</small><br><br>

              <label for="description">Описание</label>
              <textarea v-model="description" name="description" class="form-control" id="description" aria-describedby="descHelp">
                        </textarea>
              <small id="descHelp" class="form-text text-muted">Введите описание задачи</small><br><br>

              <label for="name">База данных</label>

              <select v-model="db_name" class="form-select" aria-label="База данных">
                <option selected value="">Выберите БД</option>
                <option v-for="db in db_list" v-bind:value="db.id" v-bind:key="db.id">
                  {{ db.name }}
                </option>
              </select>
              <small id="nameHelp" class="form-text text-muted">Выберите базу данных, в которой задача будет осуществлять запрос</small><br><br>
            </div>
          </form>

          <div v-if="id === 'new'">
            <button class="btn btn-success" @click="saveTask">Создать</button>
          </div>
          <div v-else>
            <button class="btn btn-success" @click="saveTask">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {server} from "@/helper";

export default {
  name: "TaskEditPage",
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      description: '',
      right_query: '',
      db_name: '',
      db_list: [],
    }
  },
  created() {
    if(this.$route.params.id !== 'new') {
      axios.get(`${server.baseURL}/get-one-task`, { params: { taskId: this.$route.params.id } })
          .then((response) => {
            const resData = response.data;

            this.name = resData.name;
            this.description = resData.description;
            this.right_query = resData.right_query;
            this.db_name = resData.db_name;
          })
    }
    axios.get(`${server.baseURL}/get-all-db`)
        .then((response) => {
          this.db_list = response.data;
        })
  },
  methods: {
    async saveTask() {
      const task = {
        id: this.$route.params.id,
        name: this.name,
        description: this.description,
        right_query: this.right_query,
        db_name: this.db_name,
      };
      if (this.$route.params.id === 'new') {
        task.id = null;
      }
      axios.post(`${server.baseURL}/save-one-task`, task)
          .then((response) => {
            if (response.status === 201) {
              alert('Сохранено успешно');
            } else {
              alert('Произошла ошибка при сохранении');
            }
          })
    }
  },
}
</script>

<style scoped>
.form-group {
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
}
button {
  margin: 5px;
}
</style>
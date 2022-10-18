<template>
  <div id="content" style="margin-top: 70px">
    <div class="col-sm-8 offset-sm-2">
      <h3>{{ this.taskName }}</h3>
      <p>{{ this.task }}</p>
      <form id="submit-query-form" @submit.prevent="submitUserQuery()">
        <prism-editor class="my-editor" v-model="userQuery" :highlight="highlighter"></prism-editor>
        <button type="submit" class="btn btn-success">Отправить запрос</button>
      </form>

      <div v-if="taskQueryResult.length && userQueryResult.length">
        <p v-if="taskQueryResult.toString() === userQueryResult.toString()">Ответ верен - результаты равны.</p>
        <p v-else>Ответ неверен - результаты не равны.</p>

        <p>Результат вашего запроса: </p>
        <b-table bordered striped hover :items="this.userQueryResult"></b-table>

        <p>Результат запроса из условия: </p>
        <b-table bordered striped hover :items="this.taskQueryResult"></b-table>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/helper";

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css';

export default {
  name: 'TaskPage',
  components: {
    PrismEditor,
  },
  data() {
    return {
      taskId: +this.$route.params.id,
      taskName: 'Название',
      task: 'Текст задания',
      database: '',
      taskQuery: '',
      taskQueryResult: [],
      userQuery: 'SELECT ',
      userQueryResult: [],
    }
  },
  created() {
    axios.get(`${server.baseURL}/get-one-task`, { params: { taskId: this.taskId } })
        .then(
            (response) => {
              const res = response.data;

              if(res) {
                this.taskName = res.name;
                this.task = res.description;
                this.database = res.db_name;
                this.taskQuery = res.right_query;
              }
            }
        )
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.sql, 'sql');
    },
    async submitUserQuery() {
      if(this.userQuery.toLowerCase().indexOf('select') !== 0) {
        alert('Ваш запрос - не SELECT');
      }

      const userQueryResponse = await this.__submitQueryToServer(this.userQuery);
      const taskQueryResponse = await this.__submitQueryToServer(this.taskQuery);

      if (userQueryResponse.status !== 200 || taskQueryResponse.status !== 200) {
        alert('Что-то пошло не так!');
      }

      this.userQueryResult = userQueryResponse.data;
      this.taskQueryResult = taskQueryResponse.data;
    },
    async __submitQueryToServer(query) {
      return await axios.get(`${server.baseURL}/get-raw-query-result`, {
        params: {
          rawQuery: query,
          database: this.database
        }});
    },
  }
}
</script>

<style scoped>
b-table {
  width: 80%;
}
.my-editor {
  width: 500px;

  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;

  margin: 15px auto;
  padding: 5px;
}
#submit-query-form {
  margin: 15px 15px 30px;
}
</style>
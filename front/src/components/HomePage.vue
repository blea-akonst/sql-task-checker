<template>
  <div id="content">
    <div class="col-sm-8 offset-sm-2">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" v-bind:key="task.id">
          <td> {{ task.id + 1 }}</td>
          <td> {{ task.name }}</td>
          <td>
            <router-link id="action" :to="`/task-edit/${task.id}`" class="btn btn-outline-info"> Редактировать</router-link>
            <router-link id="action" :to="`/task/${task.id}`" class="btn btn-outline-success"> Просмотреть</router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "@/helper";

export default {
  name: 'HomePage',
  data() {
    return {
      tasks: [],
    }
  },
  created() {
    axios.get(`${server.baseURL}/get-all-tasks`)
        .then(
            (response) => {
              this.tasks = response.data;
            }
        );
  },
  methods: {
  }
}
</script>

<style scoped>
#action {
  margin-left: 5px;
  margin-right: 5px;
}
</style>

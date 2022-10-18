<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand>SQL-задачи</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Список задач</b-nav-item>
        <b-nav-item to="/task-edit/new">Создать новую задачу</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
</style>
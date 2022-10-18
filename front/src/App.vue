<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>
<script>

import NavBar from "@/components/common/NavBar";
export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 15px;
}
#content {
  margin-top: 20px;
}
</style>

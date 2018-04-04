<template>
  <div id="app">
    <div class="ui top attached inverted menu">
        <router-link :to="{ name: 'home', params: {} }" class="header item">Home</router-link>
        <router-link :to="{ name: 'test', params: {} }" class="item">Test</router-link>
    </div>
    <div class="ui attached segment">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>

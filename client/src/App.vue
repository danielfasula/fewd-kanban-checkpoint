<template>
  <div id="app">
    <div v-if="user._id" class="d-flex">
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
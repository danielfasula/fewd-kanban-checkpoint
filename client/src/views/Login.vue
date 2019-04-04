<template>
  <div class="login container-fluid">
    <div class="row h-100 align-items-center">
      <div class="col-12 h-50 justify-content-center">
    <form class="tilt" v-if="loginForm" @submit.prevent="loginUser">
      <input type="email" v-model="creds.email" placeholder="email">
      <input type="password" v-model="creds.password" placeholder="password">
      <button type="submit">Login</button>
    </form>
    <form class="tilt" v-else @submit.prevent="register">
      <input type="text" v-model="newUser.name" placeholder="name">
      <input type="email" v-model="newUser.email" placeholder="email">
      <input type="password" v-model="newUser.password" placeholder="password">
      <button type="submit">Create Account</button>
    </form>
    <div class="action tilt" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
  }
  .login {
    height: 100vh;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68b42995TanMsiWawbhaW6H5QfAeJW6ySBKtQ8KG4fYzXZ_2n');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .tilt {
    transform: rotate(355deg)
  }
</style>
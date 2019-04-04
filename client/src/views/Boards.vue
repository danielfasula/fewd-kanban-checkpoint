<template>
  <div class="boards container-fluid">
    <div class="row">
      <div class="col-12">
      <h1 class="">WELCOME TO THE BOARDS!!!</h1>
    </div>
    <div class="card col-3 align-items-center justify-content-center" v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}"><h1>{{board.title}}</h1></router-link>
      <button @click="deleteBoard(board._id)"><i class="fas fa-trash"></i>DELETE BOARD</button>
    </div>
    <form class="card col-3" @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
  </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        let confirmDelete = confirm('Are you sure you wanna delete that?')
        if(!confirmDelete) return
        this.$store.dispatch("deleteBoard", boardId);
      }
    }
  };
</script>
<template>
  <div class="board container-fluid">
    <h4>{{board.title}}</h4>
    <h5>{{board.description}}</h5>
    <div class="row flex-nowrap lists-container">
    <list v-for="list in lists" :listData='list'></list>
    <form class="col-6 col-md-3" @submit.prevent="addList">
      <input v-model="newList.title" type="text" required placeholder="List Title">
      <button type="submit">Submit</button>
    </form>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    props: ["boardId"],
    mounted() {
      this.$store.dispatch('getLists', this.boardId)
      this.$store.dispatch('getTasks', this.boardId)
    },
    data() {
      return {
        newList: {
          title: ''
        }
      }
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      addList() {
        let list = {...this.newList, boardId: this.boardId}
        this.$store.dispatch('addList', list)
        this.newList = {
          title: ''
        }
      }
    },
    components: {
      List
    }
  };
</script>

<style scoped>

.lists-container {
  overflow-x: scroll;
}
</style>

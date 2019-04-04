<template>
   <div class="comment-modal">
      <button data-toggle="modal" :data-target="'#modal' + task._id"><i class="fas fa-comments"></i>View Comments</button>
      <div :id="'modal'+task._id" class="modal fade">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header justify-content-center">
              <h3>{{task.title}}</h3>
            </div>
            <div class="modal-body">
              <h5 :class="i%2 ? 'bg-light text-black' : 'bg-dark text-white'" v-for="(comment, i) in task.comments">{{comment.content}}</h5>
            </div>
            <form @submit.prevent="addComment">
              <input type="text" required v-model="newComment.content">
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "comment-modal",
   props: ['task'],
   data() {
      return {
        newComment: {
          content: ''
        }
      }
   },
   computed: {},
   methods: {
     addComment() {
       this.$store.dispatch('addComment', { taskId: this.task._id, comment: this.newComment })
     }
   },
   components: {}
}
</script>
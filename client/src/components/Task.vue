<template>
   <div class="task card">
     <h4>{{task.title}}</h4>
     <select @change="moveTask">
       <option v-for="list in lists" :value="list._id" :selected="task.listId == list._id">{{list.title}}</option>
     </select>
     <comment-modal :task="task" />
     <button @click="deleteTask"><i class="fas fa-trash"></i>Delete</button>
     <div class="card-footer">
       <p>{{task.createdAt| formatTime}}</p>
     </div>
   </div>
</template>

<script>
import Moment from 'moment'
import CommentModal from '@/components/CommentModal.vue'
export default {
   name: "task",
   props: ['task'],
   data() {
      return {}
   },
   computed: {
     lists() {
       return this.$store.state.lists
     }
   },
   methods: {
     moveTask(e) {
       let listId = e.target.value
       let { _id: taskId, listId: oldListId} = this.task
       this.$store.dispatch('moveTask', {listId, taskId, oldListId})
     },
     deleteTask() {
       this.$store.dispatch('deleteTask', this.task)
     }
   },
   components: {
     CommentModal
   },
   filters: {
     formatTime(date) {
       return Moment(String(date)).format('ddd, hA')
     }
   }
}
</script>
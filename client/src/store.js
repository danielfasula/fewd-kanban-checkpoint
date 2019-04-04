import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let auth = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    lists(state, lists) {
      state.lists = lists
    },
    addList(state, list) {
      state.lists.push(list)
    },
    removeList(state, listId) {
      for (let i = 0; i < state.lists.length; i++) {
        let list = state.lists[i]
        if (list._id == listId) {
          state.lists.splice(i, 1)
          break
        }
      }
    },
    tasks(state, taskArr) {
      let obj = {}
      taskArr.forEach(task => {
        if (!obj[task.listId]) {
          obj[task.listId] = []
        }
        obj[task.listId].push(task)
      })
      state.tasks = obj
    },
    addTask(state, task) {
      let taskArr = state.tasks[task.listId] || []
      Vue.set(state.tasks, task.listId, [...taskArr, task])
    },
    removeTask(state, payload) {
      let taskArr = state.tasks[payload.oldListId]
      taskArr.forEach((task, i, arr) => {
        if (task._id == payload.taskId) {
          arr.splice(i, 1)
        }
      })
      Vue.set(state.tasks, payload.oldListId, taskArr)
    },
    replaceTask(state, task) {
      let taskArr = state.tasks[task.listId]
      let index = taskArr.findIndex(t => t._id == task._id)
      if (index != 1) {
        taskArr[index] = task
      }
      Vue.set(state.tasks, task.listId, [...taskArr])
    },

  },
  actions: {

    // #region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({commit}) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', {})
          router.push({name: 'login'})
        })
    },
    //#endregion


    // #region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //#endregion


    // #region -- LISTS --
    getLists({commit}, boardId) {
      api.get('lists/'+boardId)
        .then(res => {
          commit('lists', res.data)
        })
    },
    addList({commit}, list) {
      api.post('lists', list)
        .then(res => {
          commit('addList', res.data)
        })
        .catch(e => console.error(e))
    },
    deleteList({ commit }, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          console.log(res.data.message)
          commit('removeList', list._id)
      })
        .catch(e => console.error(e))
    },


    //#endregion


    // #region -- TASKS --

    getTasks({commit}, boardId) {
      api.get('tasks/' + boardId)
        .then(res => {
        commit('tasks', res.data)
      })
    },

    addTask({ commit }, task) {
      api.post('tasks', task)
        .then(res => {
          console.log(res)
          commit('addTask', res.data)
        })
      .catch(e => console.error(e))
    },

    moveTask({ commit }, payload) {
      api.put('tasks/' + payload.taskId, payload)
        .then(res => {
          commit('addTask', res.data)
          commit('removeTask', payload)
        })
      .catch(e => console.error(e))
    },
    
    deleteTask({commit}, { _id: taskId, listId: oldListId}) {
      api.delete('tasks/' + taskId) 
        .then(res => {
          console.log(res)
          commit('removeTask', {taskId, oldListId})
        })
        .catch(e => console.error(e))
      
    },

    //#endregion


    // #region -- COMMENTS --
    addComment({ commit }, payload) {
      api.put('tasks/' + payload.taskId + '/add-comment', payload.comment)
        .then(res => {
          console.log(res)
          commit('replaceTask', res.data)
        })
      .catch(e => console.error(e))
    },

    // #endregion

  }
})

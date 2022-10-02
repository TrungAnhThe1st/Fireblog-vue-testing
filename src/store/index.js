import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {
        blogTitle: "BlogCard1",
        blogCoverPhoto: "stock-1",
        blogDate: "August 1, 2022"
      },
      {
        blogTitle: "BlogCard2",
        blogCoverPhoto: "stock-2",
        blogDate: "August 1, 2022"
      },
      {
        blogTitle: "BlogCard3",
        blogCoverPhoto: "stock-3",
        blogDate: "August 1, 2022"
      },
      {
        blogTitle: "BlogCard4",
        blogCoverPhoto: "stock-4",
        blogDate: "August 1, 2022"
      },
    ],
    editPost: null
  },
  mutations: {
    toggleEditPost(state, payload){
      state.editPost = payload
      console.log(state.editPost)
    }
  },
  actions: {
  },
  modules: {
  }
})

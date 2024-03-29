import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        blogPosts: [],
        postLoaded: null,
        blogHTML: "Write your blog title here...",
        blogTitle: "",
        blogPhotoName: "",
        blogPhotoFileURL: null,
        blogPhotoPreview: false,
        editPost: null,
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUsername: null,
        profileId: null,
        profileInitials: null
    },
    getters: {
        blogPostsFeed(state) {
            return state.blogPosts.slice(0, 2)
        },
        blogPostsCards(state) {
            return state.blogPosts.slice(2, 6)
        }
    },
    mutations: {
        toggleEditPost(state, payload) {
            state.editPost = payload
            console.log(state.editPost)
        },
        updateUser(state, payload) {
            state.user = payload
        },
        setProfileInfo(state, doc) {
            state.profileId = doc.id;
            state.profileEmail = doc.data().email;
            state.profileFirstName = doc.data().firstName;
            state.profileLastName = doc.data().lastName;
            state.profileUsername = doc.data().username;
        },
        setProfileInitials(state) {
            state.profileInitials =
                state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
        },
        changeFirstName(state, payload) {
            state.profileFirstName = payload
        },
        changeLastName(state, payload) {
            state.profileLastName = payload
        },
        changeUserName(state, payload) {
            state.profileUsername = payload
        },
        newBlogPost(state, payload) {
            state.blogHTML = payload
            console.log(state.blogHTML)
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload
        },
        fileNameChange(state, payload) {
            state.blogPhotoName = payload
        },
        createFileURL(state, payload) {
            state.blogPhotoFileURL = payload
        },
        openPhotoPreview(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview
        },
        filterBlogPost(state, payload) {
            state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload)
        },
        setBlogState(state, payload) {
            state.blogTitle = payload.blogTitle;
            state.blogHTML = payload.blogHTML;
            state.blogPhotoFileURL = payload.blogCoverPhoto;
            state.blogPhotoName = payload.blogCoverPhotoName;
        }
    },
    actions: {
        async getCurrentUser({ commit }) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get()
            commit("setProfileInfo", dbResults)
            commit("setProfileInitials")
            console.log(dbResults);
        },
        async updateUserSettings({ commit, state }) {
            const dataBase = await db.collection('users').doc(state.profileId)
            await dataBase.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                username: state.profileUsername
            })

            commit("setProfileInitials")
        },
        async getPost({ state }) {
            const dataBase = await db.collection("blogPosts").orderBy("date", "desc")
            const dbResults = await dataBase.get()

            dbResults.forEach(doc => {
                if (!state.blogPosts.some(post => post.blogID === doc.id)) {
                    const data = {
                        blogID: doc.data().blogID,
                        blogHTML: doc.data().blogHTML,
                        blogCoverPhoto: doc.data().blogCoverPhoto,
                        blogCoverPhotoName: doc.data().blogCoverPhotoName,
                        blogDate: doc.data().date,
                        blogTitle: doc.data().blogTitle,
                    }

                    state.blogPosts.push(data)
                }
            })

            state.postLoaded = true
            console.log(state.blogPosts)
        },
        async deletePost({ commit }, payload) {
            const getPost = await db.collection("blogPosts").doc(payload)
            await getPost.delete()
            commit("filterBlogPost", payload)
        },
        async updatePost({ commit, dispatch }, payload) {
            commit("filterBlogPost", payload)
            await dispatch("getPost")

        }
    },
    modules: {},
})
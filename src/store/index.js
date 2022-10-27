import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sampleBlogCards: [{
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
        editPost: null,
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUserName: null,
        profileId: null,
        profileInitials: null
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

    },
    actions: {
        async getCurrentUser({ commit }) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResults = await dataBase.get()
            commit("setProfileInfo", dbResults)
            commit("setProfileInitials")
            console.log(dbResults);
        }
    },
    modules: {},
})
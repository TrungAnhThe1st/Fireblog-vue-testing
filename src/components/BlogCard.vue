<template>
    <div class="blog-card">
        <!-- <div v-show="editPost" class="icons">
            <div @click="editBlog" class="icon">
                <Edit class="edit" />
            </div>
            <div @click="deletePost" class="icon">
                <Delete class="delete" />
            </div>
        </div> -->
        <img :src="post.blogCoverPhoto" alt="" />
        <div class="info">
            <h4>{{ post.blogTitle }}</h4>
            <h6>Posted on: {{ new Date(post.blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h6>
            <router-link class="link" :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }">
                View The Post
                <Arrow class="arrow" />
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    props: {
        post: Object
    },

}
</script>

<style>

</style>
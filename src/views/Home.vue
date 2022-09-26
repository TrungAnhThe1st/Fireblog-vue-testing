<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPosts" :key="index"/>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
export default {
  name: "Home",
  components: { BlogPost },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPosts: [
        {
          title: "Demo1",
          blogHTML: "This is a demo",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "Demo2",
          blogHTML: "This is a demo",
          blogCoverPhoto: "beautiful-stories",
        },
      ],
    };
  },
};
</script>

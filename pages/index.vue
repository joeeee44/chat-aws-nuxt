<template>
  <v-layout row wrap>
    <v-btn block class="mt-4" color="primary" @click="signout">Sign out</v-btn>

    <v-flex xs12 class="mb-5">
      <v-card>
        <v-card-title class="headline">Welcome to Chat</v-card-title>
        <div v-for="(list, index) in mapPosts" :key="index">
          <v-card-title class="font-weight-bold pb-0">
            {{ list.title }}
          </v-card-title>
          <v-card-text class="font-weight-thin pt-0">{{
            list.content
          }}</v-card-text>
        </div>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-text-field
        v-model="state.title"
        label="title"
        @change.native="onChange"
      ></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-text-field
        v-model="state.content"
        label="content"
        @change.native="onChange"
      ></v-text-field>
    </v-flex>

    <v-flex xs12>
      <v-btn color="primary" @click="createPost">Add</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { listPosts } from '@/src/graphql/queries'
import { createPost } from '@/src/graphql/mutations'
import { onCreatePost } from '@/src/graphql/subscriptions'

export default {
  middleware: 'auth',
  data() {
    return {
      state: {
        posts: [],
        title: '',
        content: '',
      },
    }
  },

  computed: {
    mapPosts() {
      return this.state.posts.map((post, idx) => {
        return post
      })
    },
  },

  async mounted(e) {
    try {
      const posts = await API.graphql(graphqlOperation(listPosts))
      console.log('posts: ', posts)
      this.state.posts = posts.data.listPosts.items
    } catch (e) {
      console.log(e)
    }

    API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: eventData => {
        console.log('eventData: ', eventData)
        const post = eventData.value.data.onCreatePost
        const posts = [
          ...this.state.posts.filter(content => {
            return content.title !== post.title
          }),
          post,
        ]
        this.state.posts = posts
      },
    })
  },

  methods: {
    async createPost() {
      // バリデーションチェック
      if (this.state.title === '' || this.state.content === '') return

      // 新規登録 mutation
      const createPostInput = {
        title: this.state.title,
        content: this.state.content,
      }

      // 登録処理
      try {
        const posts = [...this.state.posts, createPostInput]
        this.state.posts = posts
        this.state.title = ''
        this.state.content = ''
        await API.graphql(
          graphqlOperation(createPost, { input: createPostInput }),
        )
        console.log('createPostInput: ', createPostInput)
      } catch (e) {
        console.log(e)
      }
    },

    onChange(e) {
      console.log(e)
      this['e.target.name'] = e.target.value
    },

    async signout() {
      try {
        await this.$Amplify.Auth.signOut()
        this.signedIn = false
        this.$router.push('/signin')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>

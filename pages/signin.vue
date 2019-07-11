<template>
  <v-layout row wrap align-center justify-center>
    <v-card class="signin-form px-5 py-5">
      <v-card-title class="headline">Sign in</v-card-title>

      <nuxt-link to="signup">Sign up</nuxt-link>

      <v-flex xs12>
        <v-text-field
          v-model="userInfo.email"
          type="email"
          label="email"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          v-model="userInfo.password"
          block
          type="password"
          label="password"
        ></v-text-field>
      </v-flex>

      <span>{{ errorMessage }}</span>
      <v-btn block class="mt-4" color="primary" @click="signin">Sign in</v-btn>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        email: '',
        password: '',
      },
      errorMessage: '',
    }
  },

  methods: {
    signin() {
      this.$Amplify.Auth.signIn(this.userInfo.email, this.userInfo.password)
        .then(user => {
          console.log(user)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.errorMessage = 'サインインできませんでした'
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.signin-form {
  min-width: 330px;
  text-align: center;
}
</style>

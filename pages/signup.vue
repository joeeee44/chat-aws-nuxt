<template>
  <v-layout row wrap align-center justify-center>
    <v-card class="signin-form px-5 py-5">
      <v-card-title class="headline">Sign up</v-card-title>

      <nuxt-link to="signin">Sign in</nuxt-link>

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
          type="password"
          label="password"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          v-model="userInfo.confirmPassword"
          type="password"
          label="Confirm Password"
        ></v-text-field>
      </v-flex>

      <span>{{ errorMessage }}</span>
      <v-btn block class="mt-4" color="primary" @click="signup">signup</v-btn>
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
        confirmPassword: '',
      },
      errorMessage: '',
    }
  },

  methods: {
    async signup() {
      if (!this.validate()) {
        return
      }
      try {
        await this.$Amplify.Auth.signUp(
          this.userInfo.email,
          this.userInfo.password,
        )
        this.$router.push({
          name: 'confirm-signup',
          params: { email: this.userInfo.email },
        })
      } catch {
        this.errorMessage = 'サインアップできませんでした'
      }
    },
    validate() {
      if (!this.userInfo.email) {
        this.errorMessage = 'emailが入力されていません。'
        return
      }
      if (!this.userInfo.password) {
        this.errorMessage = 'passwordを入力してください。'
        return
      }
      if (this.userInfo.password !== this.userInfo.confirmPassword) {
        this.errorMessage = 'パスワードが一致しません。'
        return false
      }
      this.errorMessage = ''
      return true
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

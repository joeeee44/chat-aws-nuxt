<template>
  <v-layout row wrap align-center justify-center>
    <v-card class="signin-form px-5 py-5">
      <v-card-title class="headline">Forgot Password</v-card-title>

      <nuxt-link to="signup">Sign up</nuxt-link>

      <v-flex xs12>
        <v-text-field
          v-model="userInfo.email"
          type="email"
          label="email"
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field v-model="userInfo.code" label="Code"></v-text-field>
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
      <v-btn block class="mt-4" color="primary" @click="forgotPassword"
        >submit</v-btn
      >
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        email: '',
        code: '',
        password: '',
      },
      errorMessage: '',
    }
  },

  mounted() {
    if (this.$route.params.email) {
      this.userInfo.email = this.$route.params.email
    }
  },

  methods: {
    async forgotPassword() {
      try {
        await this.$Amplify.Auth.forgotPasswordSubmit(
          this.userInfo.email,
          this.userInfo.code,
          this.userInfo.password,
        )
        this.$router.push('/signin')
      } catch {
        this.errorMessage = '新しいパスワードを設定できませんでした。'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.signin-form {
  width: 100%;
  max-width: 400px;
  text-align: center;
}
</style>

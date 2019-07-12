<template>
  <v-layout row wrap align-center justify-center>
    <v-card class="signin-form px-5 py-5">
      <v-card-title class="headline">Sign up</v-card-title>

      <nuxt-link to="signin">Sign in</nuxt-link>

      <v-flex xs12>
        <v-text-field
          v-model="userInfo.verificationCode"
          type="text"
          label="Verification Code"
        ></v-text-field>
      </v-flex>

      <span>{{ errorMessage }}</span>
      <v-btn block class="mt-4" color="primary" @click="signup">Verify</v-btn>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        verificationCode: '',
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
        await this.$Amplify.Auth.confirmSignUp(
          this.$route.params.email,
          this.userInfo.verificationCode,
        )
        this.$router.push('/signin')
      } catch {
        this.errorMessage = 'サインアップできませんでした'
      }
    },
    validate() {
      if (!this.userInfo.verificationCode) {
        this.errorMessage = 'Verify Codeが入力されていません。'
        return
      }
      this.errorMessage = ''
      return true
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

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
import { AmplifyEventBus } from 'aws-amplify-vue'

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
    async signin() {
      try {
        await this.$Amplify.Auth.signIn(
          this.userInfo.email,
          this.userInfo.password,
        )
        AmplifyEventBus.$emit('authState', 'signedIn')
        this.$router.push('/')
      } catch (e) {
        switch (e.code) {
          case 'UserNotConfirmedException':
            await this.$Amplify.Auth.resendSignUp(this.userInfo.email)
            this.$router.push({
              name: 'confirm-signup',
              params: { email: this.userInfo.email },
            })
            break
          case 'PasswordResetRequiredException':
            await this.$Amplify.Auth.forgotPassword(this.userInfo.email)
            this.$router.push({
              name: 'forgot-password',
              params: { email: this.userInfo.email },
            })
            break
          case 'NotAuthorizedException':
          case 'UserNotFoundException':
          default:
            this.errorMessage = 'emailかpasswordが間違っています。'
            break
        }
        if (!e.code) {
          this.errorMessage = 'ログインできませんでした'
        }
      }
    },
    async forgotPassword() {
      if (!this.userInfo.email) {
        this.errorMessage = 'emailを入力してください。'
        return
      }
      await this.$Amplify.Auth.forgotPassword(this.userInfo.email)
      this.$router.push({
        name: 'forgot-password',
        params: { email: this.userInfo.email },
      })
    },

    // signin() {
    //   this.$Amplify.Auth.signIn(this.userInfo.email, this.userInfo.password)
    //     .then(user => {
    //       console.log(user)
    //       this.$router.push('/')
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       this.errorMessage = 'サインインできませんでした'
    //     })
    // },
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

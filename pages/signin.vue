<template>
  <v-layout row wrap>
    <v-layout align-center justify-center>
      <!-- <amplify&#45;authenticator :auth&#45;config="authConfig" /> -->
      <amplify-authenticator />
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      // authConfig: {
      //   // 通常のログイン
      //   signInConfig: {
      //     header: 'Sign in !!'
      //   },
      //   // 登録
      //   signUpConfig: {
      //     hideDefaults: true,
      //     signUpFields: [
      //       {
      //         label: 'Email',
      //         key: 'username',
      //         required: true,
      //         type: 'email',
      //         displayOrder: 0
      //       },
      //       {
      //         label: 'Password',
      //         key: 'password',
      //         required: true,
      //         type: 'text',
      //         displayOrder: 1
      //       }
      //     ]
      //   },
      //   // 登録confirm
      //   confirmSignUpConfig: {},
      //   // パス忘れ
      //   forgotPasswordConfig: {},
      //   // MFA
      //   confirmSignInConfig: {}
      // }
    }
  }
}
</script>

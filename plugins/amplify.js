import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'
import awsExports from '@/src/aws-exports'

Amplify.configure(awsExports)

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.component(components)

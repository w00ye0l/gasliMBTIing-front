import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faHouse, faCircleUser, faBook, faComments, faRightToBracket, faAddressBook, faEnvelope, faLock, faFaceSmile, faBaby, faMars, faVenus, faBell, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faHouse, faCircleUser, faBook, faComments, faRightToBracket, faAddressBook, faEnvelope, faLock, faFaceSmile, faBaby, faMars, faVenus, faBell, faArrowLeft);
import vueMoment from 'vue-moment'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

createApp(App).use(store).use(router, axios, vueMoment).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

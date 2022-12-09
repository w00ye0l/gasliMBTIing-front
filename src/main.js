import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faHouse, faCircleUser, faBook, faComments, faRightToBracket, faAddressBook, faEnvelope, faLock, faFaceSmile, faBaby, faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faHouse, faCircleUser, faBook, faComments, faRightToBracket, faAddressBook, faEnvelope, faLock, faFaceSmile, faBaby, faMars, faVenus);

axios.defaults.baseURL = 'http://localhost:8000'

createApp(App).use(store).use(router, axios).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-10">
        <h1 class="title">로그인</h1>

        <form @submit.prevent="submitForm" class="box">
          <div class="field">
            <label>이메일</label>
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="이메일" name="email" v-model="username">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="fa-envelope" />
              </span>
            </p>
          </div>

          <div class="field">
            <label>비밀번호</label>
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="비밀번호" name="password" v-model="password">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="fa-lock" />
              </span>
            </p>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="btn__submit button">Submit</button>
            </div>
          </div>
        </form>
        <div class="signup__link">
          <p>아직 회원이 아니신가요?</p>
          <router-link to="/sign-up">회원가입!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'LogIn',
    data() {
      return {
        username: '',
        password: '',
        errors: [],
      }
    },
    methods: {
      async submitForm() {
        this.$store.commit('setIsLoading', true)

        axios.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('token')

        const formData = {
          username: this.username,
          password: this.password,
        }

        await axios
          .post('/api/v1/token/login/', formData)
          .then(response => {
            const token = response.data.auth_token

            this.$store.commit('setToken', token)

            axios.defaults.headers.common['Authorization'] = 'Token ' + token

            localStorage.setItem('token', token)

            this.$router.push('/dashboard/my-account')
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
            } else if (error.message) {
              this.errors.push('Something went wrong. Please try again!')
            }
          })

        await axios
          .get('/api/v1/users/me')
          .then(response => {
            this.$store.commit('setUser', {'id': response.data.id, 'username': response.data.username})

            localStorage.setItem('username', response.data.username)
            localStorage.setItem('userid', response.data.id)
          })
          .catch(error => {
            console.log(error)
          })
        
        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>

<style scoped>
label {
  font-size: 1.3rem;
}
.btn__submit {
  margin-top: 2rem;
  width: 100%;
  font-size: 1.3rem;
  background: #bd32fd;
  border-radius: 2rem;
  color: #fff;
  border: 2px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.2rem #bd32fd;
}
.btn__submit:hover {
  background: #9f22da;
  color: #fff;
  border: 2px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.2rem #9f22da;
}
.signup__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.signup__link a {
  padding: 0.5rem 1rem;
  background: #d26ff0;
  border-radius: 2rem;
  color: rgb(253, 253, 253);
}
.signup__link a:hover {
  background: #bd32fd;
}
</style>
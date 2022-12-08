<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-10">
        <h1 class="title">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" name="email" class="input" v-model="username">
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" name="password1" class="input" v-model="password1">
            </div>
          </div>

          <div class="field">
            <label>Repeat Password</label>
            <div class="control">
              <input type="password" name="password2" class="input" v-model="password2">
            </div>
          </div>

          <div class="field">
            <label>Nickname</label>
            <div class="control">
              <input type="text" name="nickname" class="input" v-model="nickname">
            </div>
          </div>

          <div class="field">
            <label>Age</label>
            <div class="control">
              <input type="text" name="age" class="input" v-model="age">
            </div>
          </div>

          <div class="field">
            <label>Gender</label>
            <div class="control">
              <div class="select">
                <select v-model="gender">
                  <option value="남">남</option>
                  <option value="여">여</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>MBTI1</label>
            <div class="control">
              <div class="select">
                <select v-model="mbti1">
                  <option value="E">E</option>
                  <option value="I">I</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>MBTI2</label>
            <div class="control">
              <div class="select">
                <select v-model="mbti2">
                  <option value="N">N</option>
                  <option value="S">S</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>MBTI3</label>
            <div class="control">
              <div class="select">
                <select v-model="mbti3">
                  <option value="T">T</option>
                  <option value="F">F</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label>MBTI4</label>
            <div class="control">
              <div class="select">
                <select v-model="mbti4">
                  <option value="P">P</option>
                  <option value="J">J</option>
                </select>
              </div>
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {toast} from 'bulma-toast'

  export default {
    name: 'SignUp',
    data() {
      return {
        username: '',
        password1: '',
        password2: '',
        nickname: '',
        age: '',
        gender: '',
        mbti1: '',
        mbti2: '',
        mbti3: '',
        mbti4: '',
        errors: [],
      }
    },
    methods: {
      async submitForm() {
        this.errors = []

        if (this.username === '') {
          this.errors.push('The username is missing')
        }

        if (this.password1 === '') {
          this.errors.push('The password is too short')
        }

        if (this.password1 !== this.password2) {
          this.errors.push('The password are not matching')
        }

        if (!this.errors.length) {
          this.$store.commit('setIsLoading', true)

          const formData = {
            username: this.username,
            password: this.password1,
            gender: this.gender,
            nickname: this.nickname,
            age: this.age,
            mbti1: this.mbti1,
            mbti2: this.mbti2,
            mbti3: this.mbti3,
            mbti4: this.mbti4
          }

          await axios
            .post('/api/v1/users/', formData)
            .then(response => {
              toast({
                message: 'Account was created, please log in',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
              })

              this.$router.push('/log-in')
            })
            .catch(error => {
              console.log(formData)
              if (error.response) {
                for (const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }
              } else if (error.message) {
                this.errors.push('Something went wrong. Please try again!')
              }
            })
          
          this.$store.commit('setIsLoading', false)
        }
      }
    }
  }
</script>
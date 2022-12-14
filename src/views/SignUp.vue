<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-10">
        <h1 class="title">회원가입</h1>

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
            <label>닉네임</label>
            <p class="control has-icons-left">
              <input class="input" type="text" placeholder="닉네임" name="nickname" v-model="nickname">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="fa-face-smile" />
              </span>
            </p>
          </div>

          <div class="field">
            <label>비밀번호</label>
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="비밀번호" name="password1" v-model="password1">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="fa-lock" />
              </span>
            </p>
          </div>

          <div class="field">
            <label>비밀번호 확인</label>
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="비밀번호 확인" name="password2" v-model="password2">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="fa-lock" />
              </span>
            </p>
          </div>

          <div class="field">
            <label>프로필 사진</label>
            <div>
              <input @change="onInputImage()" type="file" ref="accountimage">
            </div>
          </div>

          <div class="ageGender">
            <div class="field age__field">
              <label>나이</label>
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="19" name="age" v-model="age">
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="fa-baby" />
                </span>
              </p>
            </div>
            
            <div class="field gender__field">
              <label>성별</label>
              <div class="control gender__radio box">
                <label class="radio">
                  <input class="gender__btn" type="radio" name="gender" v-model="gender" value="남">
                  <font-awesome-icon class="gender" icon="fa-mars" style="--genClr:#70d6ff"/>
                </label>
                <label class="radio">
                  <input class="gender__btn" type="radio" name="gender" v-model="gender" value="여">
                  <font-awesome-icon class="gender" icon="fa-venus" style="--genClr:#ff70a6"/>
                </label>
              </div>
            </div>
          </div>
          
          <label>MBTI</label>
          <div class="field mbti__field box">
            <div class="control mbti__radio" style="--clr:#FF99C8">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti1" v-model="mbti1" value="E">
                <div>E</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti1" v-model="mbti1" value="I">
                <div>I</div>
              </label>
            </div>

            <div class="control mbti__radio" style="--clr:#FCF6BD">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti2" v-model="mbti2" value="N">
                <div>N</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti2" v-model="mbti2" value="S">
                <div>S</div>
              </label>
            </div>

            <div class="control mbti__radio" style="--clr:#D0F4DE">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti3" v-model="mbti3" value="F">
                <div>F</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti3" v-model="mbti3" value="T">
                <div>T</div>
              </label>
            </div>

            <div class="control mbti__radio" style="--clr:#A9DEF9">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti4" v-model="mbti4" value="J">
                <div>J</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti4" v-model="mbti4" value="P">
                <div>P</div>
              </label>
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control submit__box">
              <button class="button__submit">MBTI!</button>
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
        image: '',
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
            image: this.image,
            gender: this.gender,
            nickname: this.nickname,
            age: this.age,
            mbti1: this.mbti1,
            mbti2: this.mbti2,
            mbti3: this.mbti3,
            mbti4: this.mbti4
          }

          const headers = {
            'content-Type': 'multipart/form-data'
          }

          await axios
            .post('/api/v1/users/', formData, {headers})
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
      },
      async onInputImage() {
        this.image = this.$refs.accountimage.files[0]
        return this.image
      }
    }
  }
</script>

<style scoped>
label {
  font-size: 1.3rem;
}
.ageGender {
  display: flex;
  justify-content: space-between;
}
.age__field, .gender__field {
  width: 45%;
}
.gender__radio {
  display: flex;
  justify-content: space-evenly;
}
.gender__radio .gender {
  font-size: 30px;
  color: #9c9c9c;
}
.gender__btn:checked + .gender {
  color: var(--genClr);
}
.mbti__field {
  display: flex;
  justify-content: space-between;
}
.mbti__radio {
  display: flex;
  flex-direction: column;
}
.radio input {
  display: none;
}
.radio + .radio {
  margin: 0;
}
.radio div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid var(--clr);
  font-size: 2rem;
  line-height: 4rem;
}
.radio__btn:checked + div {
  background: var(--clr);
}
.button__submit {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 2rem;
  background: #bd32fd;
  color: #fff;
  border: 2px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.2rem #bd32fd;
}
.button__submit:hover {
  background: #9f22da;
  box-shadow: 0 0 0 0.2rem #9f22da;
}
</style>
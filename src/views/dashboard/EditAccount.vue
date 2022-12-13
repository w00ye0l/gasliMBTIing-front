<template>
  <div class="container">
    <div class="columns is-multiline" style= "justify-content: center;">
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">나의 정보</h1>
          <form @submit.prevent="submitForm">
            <div style="display: flex; align-items: center; justify-content: space-around;">
              <img :src="user.image" class="img_profile">
            </div>

            <div>
              <input @change="onInputImage()" type="file" ref="accountimage">
            </div>

            <div>
              <div class="mbti_font"><strong>이메일 </strong><span>{{ user.username }}</span></div>
              <div class="mbti_font"><strong>닉네임 </strong><span><input type="text" class="input" v-model="nickname"></span></div>
              <div class="mbti_font"><strong>MBTI </strong>
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
            </div>

              <div class="mbti_font">
                <strong>나이 </strong>
                <p class="control has-icons-left">
                <input class="input" type="text" placeholder="19" name="age" v-model="age">
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="fa-baby" />
                </span>
                </p>
              </div> 
              <div class="mbti_font">
                <strong>성별 </strong>
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

              <div class="field">
                <div class="control column is-10" style="text-align: center;">
                  <button class="button is-success">수정 완료</button>
                </div>
              </div>

          </form>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'EditAccount',
    data() {
      return {
        user: {}
      }
    },
    mounted() {
      this.getUser()
    },
    methods: {
      async getUser() {
        this.$store.commit('setIsLoading', true)

        await axios
        .get(`/accounts/`)
        .then(response => {
          console.log(response)
          this.user = response.data
          this.nickname = this.user.nickname
          this.mbti1 = this.user.mbti1
          this.mbti2 = this.user.mbti2
          this.mbti3 = this.user.mbti3
          this.mbti4 = this.user.mbti4
          this.age = this.user.age
          this.gender = this.user.gender
          this.image = this.user.image
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      },

      async submitForm() {
        this.$store.commit('setIsLoading', true)

        const formData = {
            image: this.image,
            nickname: this.nickname,
            mbti1: this.mbti1,
            mbti2: this.mbti2,
            mbti3: this.mbti3,
            mbti4: this.mbti4,
            age: this.age,
            gender: this.gender,
        }


        const headers = {
            'content-Type': 'multipart/form-data'
        }

        await axios
          .put(`/accounts/edit/`, formData, {headers})
          .then(response => {
            this.$router.push(`/dashboard/my-account`)
          })
          .catch(error => {
            console.log(error)
          })
        
        this.$store.commit('setIsLoading', false)
      },
      async onInputImage() {
        this.image = this.$refs.accountimage.files[0]
        return this.image
      }
    }
  }
</script>

<style>
.img_profile {
  width: 15rem;
  vertical-align: middle;
}

.mbti_font {
  font-size: 20px;
}

.mbti_font1 {
  font-size: 20px;
  font-weight: bold;
}

.mbti_friend {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  
}

.mbti_left {
  float: left;
  font-weight: bold;
}

.mbti_right {
  float: right;
  font-weight: bold;
}

.bar-container {
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
  border-radius: 5px;
  margin: 0;
}

.bar1 {
  height: 20px;
  background-color: #FF99C8;
  border-radius: 5px;
  width:55%
}

.bar2 {
  height: 20px;
  background-color: #FCF6BD;
  border-radius: 5px;
  width:55%
}

.bar3 {
  height: 20px;
  background-color: #D0F4DE;
  border-radius: 5px;
  width:55%
}

.bar4 {
  height: 20px;
  background-color: #A9DEF9;
  border-radius: 5px;
  width:55%
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


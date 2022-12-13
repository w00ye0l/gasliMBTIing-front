<template>
  <div class="container">
    <div class="columns is-multiline" style= "justify-content: center;">
      <div class="column is-10 is-center">

        <!-- 회원 정보 -->
        <div class="box">
          <h1 class="title">{{ user.nickname }}님의 회원정보</h1>
          <div class="accounts__info">
            <img :src="user.image" class="img__profile">
            <span>
              <p class="mbti__font"><strong>이메일: </strong> {{ user.username }} </p>
              <p class="mbti__font"><strong>MBTI: </strong>{{ user.mbti1 }}{{ user.mbti2 }}{{ user.mbti3 }}{{ user.mbti4 }} </p>
              <p class="mbti__font"><strong>나이: </strong> {{ user.age }} </p> 
              <p class="mbti__font"><strong>성별: </strong> {{ user.gender }} </p>
            </span>
          </div>

          <!-- 로그아웃 버튼 -->
          <div class="column is-10" style="text-align: center; margin: auto;">
            <div class="buttons" style=" display: inline-block;">
              <router-link :to="{ name: 'EditAccount' }" class="button is-success">프로필 편집</router-link>
              <button @click="logout()" class="button is-danger">로그아웃</button>
            </div>
          </div>
        </div>
      </div> 

      <!-- 방명록 -->
      <div class="box">
        <h1 class="title">방명록</h1>
        <div class="guest__group column is-10 is-center">
          <div v-for="guest in guestlist" v-bind:key="guest.id">
            <router-link class="guest__link" :to="{ name: 'Guestbook', params: { id: guest.id }}">
              <div class="guest_note">
                <div class="guest__box">
                  <p class="guest__content">{{ guest.name }} | {{ guest.contents }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div> 

      <!-- 원래 수정 전 -->
      <!-- <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">방명록</h1>
          <div v-for="guest in guestlist" v-bind:key="guest.id">
            {{ guest.name }}, {{ guest.contents }}
          </div>
        </div>
      </div>  -->

      <!-- 친구 분포도 -->
      <div class="column is-10 is-center">
        <div class="box">
          <h1 class="title">친구 분포도</h1>
          <div>
            <div class="mbti__friend">
              <div><span class="mbti__left">E</span> <span class="mbti__right">I</span></div>
              <div class="bar__container">
                <div id="content__bar" class="bar1"></div>
              </div> 
            </div>           
            <div class="mbti__friend">
              <div><span class="mbti__left">N</span> <span class="mbti__right">S</span></div>
              <div class="bar__container">
                <div id="content__bar" class="bar2"></div>
              </div>           
            </div>
            <div class="mbti__friend">
              <div><span class="mbti__left">T</span> <span class="mbti__right">F</span></div>
                <div class="bar__container">
                  <div id="content__bar" class="bar3"></div>
                </div>           
            </div>
            <div class="mbti__friend">
              <div><span class="mbti__left">P</span> <span class="mbti__right">J</span></div>
                <div class="bar__container">
                  <div id="content__bar" class="bar4"></div>
                </div>           
            </div>            
          </div>  
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'MyAccount',
    data() {
      return {
        user: {},
        guestlist:[]
      }
    },

    created() {
      this.getUser()      
    },

    methods: {
      async getUser() {      
        this.$store.commit('setIsLoading', true)

        const userID = this.$route.params.id

        await axios
        .get(`/accounts/`)
        .then(response => {
          console.log(response)
          this.user = response.data
          console.log(this.user)
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
        this.getGuestbook()
        this.getFriends()
      },
      async getGuestbook() {
        this.$store.commit('setIsLoading', true)

        await axios
        .get(`/guestbook/${this.user.id}/`)
        .then(response => {
          console.log(response)
          this.guestlist = response.data
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      },
      async getFriends(){
        await axios
        .get(`/friends/`)
        .then(response => {
          const friendsDict = {'E':0,'I':0,'N':0,'S':0,'F':0,'T':0,'P':0,'J':0}
          for (let i=0;i<response.data.length;i++){
            for (let j=0;j<response.data[i].mbti.length;j++){
                friendsDict[response.data[i].mbti[j]] += 1
            }
          }
          const mbtiE = Math.round(friendsDict['E']/(friendsDict['E'] + friendsDict['I']) * 100)
          const mbtiN = Math.round(friendsDict['N']/(friendsDict['N'] + friendsDict['S']) * 100)
          const mbtiT = Math.round(friendsDict['T']/(friendsDict['T'] + friendsDict['F']) * 100)
          const mbtiP = Math.round(friendsDict['P']/(friendsDict['P'] + friendsDict['J']) * 100)
          const bar1 = document.querySelector('.bar1')
          const bar2 = document.querySelector('.bar2')
          const bar3 = document.querySelector('.bar3')
          const bar4 = document.querySelector('.bar4')
          bar1.style.width = String(mbtiE) + "%"
          bar2.style.width = String(mbtiN) + "%"
          bar3.style.width = String(mbtiT) + "%"
          bar4.style.width = String(mbtiP) + "%"

        })
        .catch(error => {
            console.log(error)
          })
      },
      async logout() {
        await axios
          .post('/api/v1/token/logout/')
          .then(response => {
            console.log('Logged out')
          })
          .catch(error => {
            console.log(JSON.stringify(error))
          })

        axios.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userid')
        this.$store.commit('removeToken')
        this.$router.push('/')
      },
    }
  }
</script>

<style>
.accounts__info {
  display: flex; 
  align-items: center; 
  justify-content: space-around;
}
.img__profile {
  width: 5rem;
  vertical-align: middle;
}
.mbti__font {
  font-size: 20px;
}
.mbti__font1 {
  font-size: 20px;
  font-weight: bold;
}
.mbti__friend {
  font-size: 20px;
  display: flex;
  flex-direction: column;  
}
.mbti__left {
  float: left;
  font-weight: bold;
}
.mbti__right {
  float: right;
  font-weight: bold;
}
.bar__container {
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
.guest__content {
  font-size: 1.3rem;
}
.guest__link {
  color: #000;
}

/* 방명록 리스트(포스트잇) */
.guest__group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
*:before,*:after {
  box-sizing: border-box;
}
* {
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.guest_note {
  width: 100%;
  position: relative;
  margin: 0;
}
.guest__box {
  width: 10rem;
  height: 10rem;
  padding: 40px 0;
  text-align: center;
  position: relative;
  border-bottom-right-radius: 25px;
  overflow: hidden;
  box-shadow: 29px 24px 26px -26px rbga(0,0,0,.5);
  background: #FCF6BD;
}
.guest__box:before,.guest__box:after {
  content: '';
  position: absolute;
  z-index: 1;
  right: -5px;
  bottom: -5px;
  width: 30px;
  height: 30px;
  box-shadow: 0px 5px 25px rbga(0,0,0,.5);
  transform: skew(-5deg) rotate(-3deg);
}
.guest__box:after {
  right: -5px;
  bottom: -5px;
  transform: skew(3deg) rotate(0deg);
  box-shadow: 2px 2px 18px rbga(0,0,0,.5);;
}
</style>


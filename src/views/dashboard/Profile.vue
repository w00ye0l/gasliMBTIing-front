<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-10 is-center">
        <!-- 회원 정보 -->
        <h1 class="title">'{{ user.nickname }}' 님의 회원정보</h1>

        <hr>

        <div class="box">
          <div class="profile__info">
            <img :src="user.image" class="img__profile">
            <span>
              <p class="mbti__font"><strong>이메일: </strong> {{ user.username }} </p>
              <p class="mbti__font"><strong>MBTI: </strong>{{ user.mbti1 }}{{ user.mbti2 }}{{ user.mbti3 }}{{ user.mbti4 }} </p>
              <p class="mbti__font"><strong>나이: </strong> {{ user.age }} </p> 
              <p class="mbti__font"><strong>성별: </strong> {{ user.gender }} </p>
            </span>
          </div>
        </div> 

        <!-- 방명록 -->
        <h1 class="title">방명록</h1>
        <div class="box">
          <div class="write__div">
            <router-link :to="{ name: 'AddGuestbook', params: { id: Number(user.id) }}" class="write__btn is-light">글쓰기</router-link>
          </div>
          <template v-if="guestlist.length">
            <div class="guest__group">
              <div v-for="guest in guestlist" v-bind:key="guest.id">
                <router-link class="guest__link" :to="{ name: 'Guestbook', params: { id: guest.id }}">
                  <font-awesome-icon class="icon is-middle pin-icon" icon="thumb-tack" />
                  
                  <div class="guest__box">
                    <div class="guest__name">'{{ guest.name }}'</div>
                    <p>님의 방명록</p>
                  </div>
                </router-link>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="guest__none">
              <p>아직 방명록이 없어요..</p>
            </div>
          </template>
        </div>  

        <!-- 친구 분포도 -->
        <h1 class="title">친구 분포도</h1>
        <div class="box">
          <div class="mbti__friend">
            <div>
              <span class="mbti__left">E <span ref="per11"></span></span>
              <span class="mbti__right"><span ref="per12"></span> I</span>
            </div>
            <div class="bar__container" ref="barContainer" style="--bgClr:#f8afd1">
              <div ref="bar1" class="bar" style="--bgClr:#fc66ac"></div>
            </div> 
          </div>   

          <div class="mbti__friend">
            <div>
              <span class="mbti__left">N <span ref="per21"></span></span>
              <span class="mbti__right"><span ref="per22"></span> S</span>
            </div>
            <div class="bar__container" style="--bgClr:#FCF6BD">
              <div ref="bar2" class="bar" style="--bgClr:#f7e866"></div>
            </div>
          </div>

          <div class="mbti__friend">
            <div>
              <span class="mbti__left">T <span ref="per31"></span></span>
              <span class="mbti__right"><span ref="per32"></span> F</span>
            </div>
            <div class="bar__container" style="--bgClr:#D0F4DE">
              <div ref="bar3" class="bar" style="--bgClr:#43dd7e"></div>
            </div>
          </div>

          <div class="mbti__friend">
            <div>
              <span class="mbti__left">P <span ref="per41"></span></span> 
              <span class="mbti__right"><span ref="per42"></span> J</span>
            </div>
            <div class="bar__container" style="--bgClr:#b9e3f8">
              <div ref="bar4" class="bar" style="--bgClr:#66c9fa"></div>
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
    name: 'Profile',
    data() {
      return {
        user: {},
        guestlist:[],
      }
    },
    created() {
      this.getUser()
      this.getGuestbook()
    },
    methods: {
      async getUser() {      
        this.$store.commit('setIsLoading', true)

        const userID = this.$route.params.id

        await axios
          .get(`/accounts/${userID}/`)
          .then(response => {
            this.user = response.data
            //  this.user.image = process.env.VUE_APP_API_URL + this.user.image
          })
          
          .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
        this.getFriends()
      },
      async getGuestbook() {
        this.$store.commit('setIsLoading', true)

        const userID = this.$route.params.id

        await axios
          .get(`/guestbook/${userID}/`)
          .then(response => {
            this.guestlist = response.data
          })
          
          .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      },
      async getFriends(){

        await axios
          .get(`/guestbook/get/${this.$route.params.id}/`)
          .then(response => {
            console.log(response.data);
            const friendsDict = {'E':0,'I':0,'N':0,'S':0,'F':0,'T':0,'P':0,'J':0};
            for (let i=0;i<response.data.length;i++){
              for (let j=0;j<response.data[i].mbti.length;j++){
                  friendsDict[response.data[i].mbti[j]] += 1
              }
            };
            const mbtiE = Math.round(friendsDict['E']/(friendsDict['E'] + friendsDict['I']) * 100);
            const mbtiN = Math.round(friendsDict['N']/(friendsDict['N'] + friendsDict['S']) * 100);
            const mbtiT = Math.round(friendsDict['T']/(friendsDict['T'] + friendsDict['F']) * 100);
            const mbtiP = Math.round(friendsDict['P']/(friendsDict['P'] + friendsDict['J']) * 100);

            this.$refs.bar1.style.width = String(mbtiE) + "%";
            this.$refs.bar2.style.width = String(mbtiN) + "%";
            this.$refs.bar3.style.width = String(mbtiT) + "%";
            this.$refs.bar4.style.width = String(mbtiP) + "%";

            const totalLen = this.$refs.barContainer.clientWidth;
            
            this.$refs.per11.textContent = Math.round(this.$refs.bar1.clientWidth / totalLen * 100) + '%';
            this.$refs.per12.textContent = Math.round(100 - (this.$refs.bar1.clientWidth / totalLen * 100)) + '%';

            this.$refs.per21.textContent = Math.round(this.$refs.bar2.clientWidth / totalLen * 100) + '%';
            this.$refs.per22.textContent = Math.round(100 - (this.$refs.bar2.clientWidth / totalLen * 100)) + '%';

            this.$refs.per31.textContent = Math.round(this.$refs.bar3.clientWidth / totalLen * 100) + '%';
            this.$refs.per32.textContent = Math.round(100 - (this.$refs.bar3.clientWidth / totalLen * 100)) + '%';
            
            this.$refs.per41.textContent = Math.round(this.$refs.bar4.clientWidth / totalLen * 100) + '%';
            this.$refs.per42.textContent = Math.round(100 - (this.$refs.bar4.clientWidth / totalLen * 100)) + '%';
          })
          .catch(error => {
            console.log(error)
          })
      },

    }
  }
</script>

<style scoped>
.write__div {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.write__btn {
  padding: 0.3rem 1.5rem;
  background: #bd32fd;
  color: #fff;
  border-radius: 10rem;
  border: 2px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.2rem #bd32fd;
}
.write__btn:hover {
  background: #9f22da;
  color: #fff;
  box-shadow: 0 0 0 0.2rem #9f22da;
}
.profile__info {
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
  background-color: var(--bgClr);
  text-align: center;
  color: white;
  border-radius: 5px;
  margin: 0;
}
.bar {
  height: 20px;
  background-color: var(--bgClr);
  border-radius: 5px;
  width: 50%;
}

.guest__group {
  display: flex;
  min-height: 8rem;
  flex-wrap: wrap;
  justify-content: space-between;
}
.guest__none {
  text-align: center;
  font-size: 1.3rem;
}
.guest__link {
  position: relative;
  color: #000;
}
.pin-icon {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: #5e5d5d;
}
.guest__box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem 0;
  margin-top: 1.5rem;
  width: 110px;
  height: rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom-right-radius: 25px;
  box-shadow: 10px 10px 30px -15px rgba(0, 0, 0, 0.26);
  background: #fff27b;
}
.guest__box:before,.guest__box:after {
  content: '';
  position: absolute;
  z-index: 1;
  right: -5px;
  bottom: -5px;
  width: 30px;
  height: 30px;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.205);
  transform: skew(-5deg) rotate(-3deg);
}
.guest__box:after {
  right: -5px;
  bottom: -5px;
  transform: skew(3deg) rotate(0deg);
  box-shadow: 2px 2px 18px rbga(0,0,0,.5);;
}
.guest__name {
  width: 70%;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>


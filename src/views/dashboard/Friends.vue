<template>
  <div class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-10">
        <h1 class="title">MBTI 저장</h1>

        <hr>

        <div class="header">
          <div class="field">
            <div class="control">
              <div class="select">
                <select v-model="group">
                  <option value="전체">전체</option>
                  <option v-for="group in groups"
                    v-bind:key="group" 
                    :value="group"
                  >{{group}}</option>
                </select>
              </div>
            </div>
          </div>
          <router-link class="add__btn" to="/dashboard/friends/add">
            <font-awesome-icon class="icon is-medium" icon="plus" />
          </router-link>
        </div>
      </div>

      <div class="column is-10">

        <hr>

        <template v-if="group === '전체'">
          <div
            v-for="friend in friends"
            v-bind:key="friend.id"
            class="friend__box box"
            v-on:click="showModal" 
            :data-id="friend.id"
            >
            <div class="friend__info">
              <img class="friend__img" :src="'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg'" alt="">
              <h1 class="friend__name">{{friend.name}}</h1>
            </div>
            <div>
              <p class="friend__mbti">{{friend.mbti}}</p>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="friend in friends"
            v-bind:key="friend.id"
          >
            <div
              class="friend__box box"
              v-if="friend.group === group"
              v-on:click="showModal" 
              :data-id="friend.id"
            >
              <div class="friend__info">
                <img class="friend__img" :src="'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg'" alt="">
                <h1 class="friend__name">{{friend.name}}</h1>
              </div>
              <div>
                <p class="friend__mbti">{{friend.mbti}}</p>
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>

    <!-- 모달 -->
    <div class="modal" v-bind:class="{ 'is-active': isShowModal }">

    <div class="modal-background" v-on:click="isShowModal = false"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="body__head">
            <span class="body__title">상세 정보</span>
            <button class="delete" aria-label="close" v-on:click="isShowModal=false"></button>
          </div>

          <div class="body__content">
            <hr class="hr__custom" style="--hr:#fc66ac">
            <div class="friend__content">
              <div class="icon__box">
                <font-awesome-icon class="icon is-medium" icon="circle-user" />
                <p class="icon__name">이름</p>
              </div>
              <p>{{ selectedFriend.name }}</p>
            </div>

            <hr class="hr__custom" style="--hr:#f7e866">
            <div class="friend__content">
              <div class="icon__box">
                <font-awesome-icon class="icon is-medium" icon="hashtag" />
                <p class="icon__name">그룹</p>
              </div>
              <p>{{ selectedFriend.group }}</p>
            </div>
            
            <hr class="hr__custom" style="--hr:#87f5b1">
            <div class="friend__content">
              <div class="icon__box">
                <img class="icon icon__img" src="../../assets/images/mbti.png" alt="">
              </div>
              <p>{{ selectedFriend.mbti }}</p>
            </div>
            <hr class="hr__custom" style="--hr:#66c9fa">
          </div>
          <div class="friend__content">
            <router-link class="friend__btn" style="--bgbtn:#eee48f" :to="{ name: 'EditFriends', params: { id: Number(selectedFriend.id) }}">수정
            </router-link>
            <button class="friend__btn" style="--bgbtn:#e28181" @click="deleteFriends" :data-id="selectedFriend.id">삭제</button>
          </div>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Friends',
    data() {
      return {
        friends: [],
        group:"전체",
        groups:[],
        isShowModal: false,
        selectedId:'',
        selectedFriend:'',
        selectedName:''
      }
    },
    created() {
      this.getFriends()
    },
    methods: {
      async getFriends() {
        this.$store.commit('setIsLoading', true)
        
        await axios
        .get('/friends/')
        .then(response => {
          this.friends = response.data
          for(let i=0;i<this.friends.length;i++){
            if(this.groups.includes(this.friends[i].group) != true){
              this.groups.push(this.friends[i].group)
            }
          }
        })
        
        .catch(error => {
            console.log(error)
          })
          
        this.$store.commit('setIsLoading', false)
      },
    async updateFriends(event){
			const dataId = event.target.getAttribute('data-id');

      await axios
        .put(`/friends/update/${dataId}`)
        .then(response => {
          this.friends = response.data
          this.getFriends()
        })
        
        .catch(error => {
            console.log(error)
          })
		},
    async deleteFriends(event){
      const deleteConfirm = confirm("해당 친구를 삭제하시겠습니까? ")
      if (deleteConfirm == false) {

      }else {
        const dataId = event.target.getAttribute('data-id');

      await axios
        .delete(`/friends/delete/${dataId}`)
        .then(response => {
          this.getFriends()
          this.isShowModal = false
        })
        .catch(error => {
            console.log(error)
          })
      }
		},showModal(event){
      this.isShowModal = true
      this.selectedName
      this.selectedId = event.target.getAttribute('data-id')
      for (let i=0; i < this.friends.length ; i++){
        if (this.friends[i].id == this.selectedId){
          this.selectedFriend = this.friends[i]
          this.selectedName
        }
      }
    }
    }
  }
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add__btn {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #bd32fd;
  border: 2px dashed #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 0.3rem #bd32fd;
}
.add__btn:hover {
  color: #fff;
  background: #9f22da;
  box-shadow: 0 0 0 0.3rem #9f22da;
}
.friend__box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.friend__box:hover {
  cursor: pointer;
}
.friend__info {
  display: flex;
  align-items: center;
}
.friend__img {
  margin-right: 0.5rem;
  width: 4rem;
  height: 4rem;
  border: 0.5px solid #dfdfdf;
  border-radius: 0.5rem;
}
.friend__name {
  font-size: 1.5rem;
}
.friend__mbti {
  padding: 0 0.5rem;
  font-size: 1.5rem;
  background: #dd94ff;
  border-radius: 0.5rem;
}

.modal-card {
  max-width: 380px;
  border-radius: 1.5rem;
}

.modal-card-body {
  background: rgb(255, 255, 255);
}

.body__head {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.body__title {
  font-size: 1.5rem;
}

.body__content {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
  /* color: #e28181; */
}
.hr__custom {
  width: 120%;
  background-color: var(--hr);
}
.friend__content{
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
}
.icon__box {
  width: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(155, 155, 155);
}
.icon__box .icon {
  margin-top:0.5rem;
  display: flex;
  align-items: center;
}
.icon__img {
  margin-top:0.5rem;
  margin: auto;
  width: 2.5rem;
  height: 2.5rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.icon__name {
  font-size: 1rem;
}
.friend__btn {
  width: 40%;
  height: 3rem;
  background: var(--bgbtn);
  color: rgb(70, 67, 67);
  text-align: center;
  font-size: 2rem;
  line-height: 2.5rem;
  border-radius: 3rem;
  border: 2px dashed #fff;
  box-shadow: 0 0 0 0.3rem var(--bgbtn);
  margin: 1.5rem;
}
.friend__btn:hover {
  background: var(--bgbtn);
  color: rgb(68, 68, 68);
  box-shadow: 0 0 0 0.3rem var(--bgbtn);
  cursor: pointer;
}
</style>

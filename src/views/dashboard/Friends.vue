<template>
  <div class="container">

    <div class="modal" v-bind:class="{ 'is-active': isShowModal }">
    <div class="modal-background" v-on:click="isShowModal = false"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="body__head">
            <img class="body__title__img" src="" alt="">
            <span class="body__title" >{{ selectedFriend.name}} 님이 선택되었습니다.</span><button class="delete" aria-label="close" v-on:click="isShowModal = false"></button>
          </div>
          <div class="body__content">
            <router-link :to="{ name: 'EditFriends', params: { id: Number(selectedFriend.id) }}"><button class="go__to">수정</button></router-link>
            <button class="go__to" @click="deleteFriends" :data-id="selectedFriend.id">삭제</button>
          </div>
        </section>
      </div>
    </div>

    <div class="columns is-centered is-multiline">
      <div class="column is-10">
        <h1 class="title">MBTI 저장</h1>
        <h1 class="title">Friends</h1>
          <div class="field">
            <div class="control">
              <div class="select">
                <select v-model="group">
                  <option value="그룹">그룹</option>
                  <option v-for="g in groups"
                v-bind:key="g" :value="g">{{g}}</option>
                </select>
              </div>
            </div>
          </div>
        <router-link to="/dashboard/friends/add">Add Friends</router-link>
      </div>

      <div class="column is-10">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mbti</th>
              <th>Grade</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody v-if="group == '그룹'">
            <tr
              v-for="friend in friends"
              v-bind:key="friend.id"
              
            > <td v-on:click="showModal" :data-id="friend.id">{{ friend.name }}</td>
              <td v-on:click="showModal" :data-id="friend.id">{{ friend.mbti }}</td>
              <td v-on:click="showModal" :data-id="friend.id">{{ friend.grade }}</td>
              <td v-on:click="showModal" :data-id="friend.id">{{ friend.group }}</td>
            </tr>
          </tbody>
          <tbody v-if="group != '그룹'">
            <tr
              v-for="friend in friends"
              v-bind:key="friend.id"
              > <td v-if="friend.group == group" v-on:click="showModal" :data-id="friend.id">{{ friend.name }}</td>
              <td v-if="friend.group == group" v-on:click="showModal" :data-id="friend.id">{{ friend.mbti }}</td>
              <td v-if="friend.group == group" v-on:click="showModal" :data-id="friend.id">{{ friend.grade }}</td>
              <td v-if="friend.group == group" v-on:click="showModal" :data-id="friend.id">{{ friend.group }}</td>
            </tr>
          </tbody>
        </table>
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
        groups:[],
        group:"그룹",
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
/* label {
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
} */
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

.modal-button {
  background: #bd32fd;
  color: #fff;
  border-radius: 10rem;
  border: 4px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.5rem #bd32fd;
}

.modal-button:hover {
  background: #9f22da;
  color: #fff;
  box-shadow: 0 0 0 0.5rem #9f22da;
}

.modal-card {
  max-width: 380px;
  border-radius: 1.5rem;
}

.modal-card-head {
  position: relative;
  display: flex;
  justify-content: center;
  border: 0;
  background: #fff;
}

.modal-card-head .delete {
  position: absolute;
  top: 30px;
  right: 30px;
}

.modal__title {
  font-size: 3rem;
}

.modal-card-body {
  background: #fff;
}

.modal-card-foot {
  display: flex;
  justify-content: center;
  border: 0;
  background: #fff;
}

.go__to {
  width: 40%;
  background: #bd32fd;
  color: #fff;
  text-align: center;
  font-size: 2rem;
  border-radius: 3rem;
  border: 4px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.5rem #bd32fd;
  margin: 1.5rem;
}

.go__to:hover {
  background: #9f22da;
  color: #fff;
  box-shadow: 0 0 0 0.5rem #9f22da;
}

.body__head {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.body__title__img {
  width: 15%;
}

.body__title {
  font-size: 1.5rem;
}

.body__content {
  text-align: center;
  margin-bottom: 2rem;
}

.body__info {
  padding: 0 2rem;
  color: #868686;
  font-size: 1rem;
}
</style>

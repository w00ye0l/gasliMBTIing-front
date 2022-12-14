<template>
  <div class="container">
    <div class="modal" v-bind:class="{ 'is-active': isShowModal }">
    <div class="modal-background" v-on:click="isShowModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <h1 class="modal__title">나의 그룹 리스트</h1>
          <button class="delete" aria-label="close" v-on:click="isShowModal = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="body__content">
            <li 
              class="body__info" 
              v-for="myGroup in myGroups"
              v-bind:key="myGroup"
              :value="myGroup.name" 
              @click="chooseGroup"
            >{{myGroup.name}}
              <button class="delete" aria-label="close" :value="myGroup.id" v-on:click="deleteGroup"></button>
            </li>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div v-on:click="isShowModal2 = true">+ 새로운 그룹 추가하기</div>
        </footer>
      </div>
    </div>

    <!--새로운 그룹 추가 하기-->
    <div class="modal" v-bind:class="{ 'is-active': isShowModal2 }">
    <div class="modal-background" v-on:click="isShowModal2 = false"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="body__head">
            <img class="body__title__img" src="" alt="">
            <span class="body__title">새로운 그룹 추가하기</span>
            <button class="delete" aria-label="close" v-on:click="isShowModal2 = false"></button>
          </div>
          <div class="field">
            <label>Group</label>
            <div class="control">
              <input type="text" class="input" v-model="addGroupName" placeholder="그룹이름을 입력해주세요.">
            </div>
          </div>
          <div class="body__content">
            <span >추천 인기 그룹</span>
            <br>
            <button 
              v-for="rgroup in recommendedGroups"
              v-bind:key="rgroup" 
              :value="rgroup" 
              @click="addChooseGroup"
            >{{rgroup}}</button>
          </div>
          
          <div class="field">
            <div class="control" style="text-align: center;">
              <button class="button is-success" @click="addGroup">저장</button>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
        </footer>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-10">
        <h1 class="title">친구 정보 추가</h1>

        <hr>
      </div>

      <div class="column is-10">
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>이름</label>
            <div class="control">
              <input type="text" class="input" v-model="name" placeholder="이름">
            </div>
          </div>
        
          <div class="field">
            <label>친밀도</label>
            <div class="control">
              <input type="text" class="input" v-model="grade" placeholder="Grade">
            </div>
          </div>

          <div class="field">
            <label>그룹</label>
            <div class="control">
              <input type="text" class="input" v-model="group" placeholder="그룹" v-on:click="isShowModalFunction" readonly>
            </div>
          </div>

          <label>MBTI</label>
          <div class="field mbti__field box">
            <div class="control mbti__radio" style="--clr:#FF99C8">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti1" v-model="mbti1" value="E" @change="changeRadio">
                <div>E</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti1" v-model="mbti1" value="I" @change="changeRadio">
                <div>I</div>
              </label>
            </div>

            <div class="control mbti__radio" style="--clr:#FCF6BD">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti2" v-model="mbti2" value="N" @change="changeRadio">
                <div>N</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti2" v-model="mbti2" value="S" @change="changeRadio">
                <div>S</div>
              </label>
            </div>

            <div class="control mbti__radio" style="--clr:#D0F4DE">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti3" v-model="mbti3" value="F" @change="changeRadio">
                <div>F</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti3" v-model="mbti3" value="T" @change="changeRadio">
                <div>T</div>
              </label>
            </div>

            <div class="control mbti__radio" style="--clr:#A9DEF9">
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti4" v-model="mbti4" value="J" @change="changeRadio">
                <div>J</div>
              </label>
              <label class="radio">
                <input class="radio__btn" type="radio" name="mbti4" v-model="mbti4" value="P" @change="changeRadio">
                <div>P</div>
              </label>
            </div>
          </div>
          
          <br>
          <div class="field">
            <div class="control" style="text-align: center;">
              <button class="go__to">저장</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { toast } from 'bulma-toast'

  export default {
    name: 'AddFriends',
    data() {
      return {
        name: '',
        mbti: '',
        mbti1: '',
        mbti2: '',
        mbti3: '',
        mbti4: '',
        grade: '',
        group: '',
        isShowModal: false,
        isShowModal2: false,
        myGroups:[],
        recommendedGroups :['가족','친구','회사','연예인','동네','게임','동창','비밀','나중에'],
        addGroupName:'',
      }
    },
    methods: {
      async submitForm() {
        this.$store.commit('setIsLoading', true)
        
        const friends = {
          name: this.name,
          mbti: this.mbti,
          grade: this.grade,
          group: this.group,
        }

        await axios
          .post('/friends/create/', friends)
          .then(response => {
            toast({
              message: '친구 정보가 추가되었습니다!',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })

            this.$router.push('/dashboard/friends')
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      },
      changeRadio() {
        this.mbti = this.mbti1 + this.mbti2 + this.mbti3 + this.mbti4
      },chooseGroup(event) {
        this.group = event.target.innerText;
        this.isShowModal = false;
      },addChooseGroup(event) {
        this.addGroupName = event.target.innerText;
      },async getMyGroups() {
        this.isShowModal = true;
        await axios
        .get(`/friends/mygroups/`)
        .then(response => {
          this.myGroups = response.data
        })
        .catch(error => {
          console.log(error)
        })
      },isShowModalFunction(){
        this.isShowModal = true;
        this.getMyGroups();
      },async addGroup(event){
        event.preventDefault();
        const myGroupsList = []
        for (let i=0; i<this.myGroups.length ;i++){
          myGroupsList.push(this.myGroups[i].name)
        }
        if (myGroupsList.includes(this.addGroupName)){
          alert("동일한 그룹이름이 이미 존재합니다.")
        }else {
          await axios
          .post(`/friends/mygroups/create/`,{name:this.addGroupName})
          .then(response => {
            this.myGroups = response.data
            this.isShowModal = false;
            this.isShowModal2 = false;
            this.addGroupName = '';
            this.getMyGroups()
          })
          .catch(error => {
            console.log(error)
          })
        }
      },async deleteGroup(event){
        event.preventDefault();
        
        const deleteConfirm = confirm("해당 그룹을 삭제하시겠습니까?");
        if (deleteConfirm == false){
        }else {
          const deletePk = event.target.getAttribute('value')
          await axios
          .delete(`/friends/mygroups/delete/${deletePk}/`)
          .then(response => {
            this.getMyGroups()
          })
          .catch(error => {
            console.log(error)
          })
        }
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
  width: 60%;
  background: #bd32fd;
  color: #fff;
  text-align: center;
  font-size: 2rem;
  border-radius: 3rem;
  border: 4px dashed rgb(255, 255, 255);
  box-shadow: 0 0 0 0.5rem #bd32fd;
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
  font-size: 2rem;
}

.body__content {
  margin-bottom: 2rem;
}

.body__info {
  padding: 0 2rem;
  color: #868686;
  font-size: 1rem;
}
</style>
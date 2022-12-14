<template>

  <div class="container">
    <div class="columns is-multiline is-centered">
      <div class="column is-10">
        <div class="community__head">
          <router-link to="/dashboard/mbti" class="back__btn">
            <font-awesome-icon class="icon is-middle" icon="arrow-left" />
          </router-link>

          <div>
            <h1 class="title">{{mbtidetail.mbti}} {{mbtidetail.board}}</h1>
          </div>

        </div>
      </div>

      <div class="column is-10">
        <div class="box head">
          <img :src="mbtidetail.image" alt="">
          <p class="detail_head title_">{{mbtidetail.character}}</p> 
          <p class="detail_head">{{mbtidetail.summary}}</p>
        </div> 
      </div>
      
      <div class="column is-10">
        <div class="box">
          <p class="content">{{mbtidetail.content}}</p>
        </div>
      </div>

      <div class="column is-10">
        <div class="box">
          <p class="content other">관련 글</p>


          <div class="is-flex is-justify-content-space-evenly">
            <template v-for="mbti_ in mbti" >
              <div v-if="mbtidetail.mbti === mbti_.mbti && mbtidetail.id != mbti_.id">
                <router-link :to="{ name: 'MbtiDetail', params: { id: mbti_.id }}" v-bind:key="mbti_.id">
                  {{mbti_.title}}
                </router-link>
              </div>
            </template>
          </div>

        </div>
      </div>

    </div>
  </div>



</template>

<script>
  import axios from 'axios'
  export default {
    name: 'MbtiDetail',
    data() {
      return {
        mbtidetail: {},
        mbti: [],
        mbtiimg: '',
      }
    },
    created() {
      this.getMbtidetail()
    },
    mounted() {
      this.getMbti()

    },

    methods: {
      async getMbtidetail() {
        this.$store.commit('setIsLoading', true)
        const mbtidetailID = this.$route.params.id
        // console.log(mbtidetailID)
        await axios
          .get(`/mbti/${mbtidetailID}/`)
          .then(response => {
            console.log(response)
            this.mbtidetail = response.data
            this.mbtiimg = response.data.mbti + '.png'
          })
          .catch(error => {
            console.log(error)
          }),
        this.$store.commit('setIsLoading', false)
        
      },

    async getMbti() {
      
      await axios
      .get(`/mbti/`)
      .then(response => {
        this.mbti = response.data
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        })
        
        this.$store.commit('setIsLoading', false)
      }
    },
  }

</script>

<style scoped>
  .community__head {
    display: flex;
    margin-bottom: 1rem;
  }
  .back__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    color: #363636;
  }

  hr {
    margin: 1rem 0;
  }

  .title_{
    font-size: 1.5rem;
    font-weight: bolder;
  }

  .box .other{
    text-align: center;
    font-size: 1.5rem;
  }

  p.content{
    font-size: 1rem;
    inline-size: 100%;
    white-space: pre-line;
  }

  .detail_head{
    text-align: center;
  }

  .head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 80px;
    height: auto;
  }

</style>
<template>


  <div class="container">
    <div class="columns is-multiline is-centered">
      <div class="column is-10">
        <h1 class="title" v-if="(mbtidetail.board == '상대법')">{{mbtidetail.mbti}} 상대법</h1>
        <h1 class="title" v-if="(mbtidetail.board == '주의할 점')">{{mbtidetail.mbti}} 주의할 점</h1>
        <h1 class="title" v-if="(mbtidetail.board == '특징')">{{mbtidetail.mbti}} 특징</h1>
      </div>

      <div class="column is-10">
        <div class="box">
          <p>{{mbtidetail.content}}</p>
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
        mbtidetail: {}
      }
    },
    created() {
      this.getMbtidetail()
    },
    methods: {
      async getMbtidetail() {
        this.$store.commit('setIsLoading', true)
        
        const mbtidetailID = this.$route.params.id

        await axios
          .get(`/MBTI/${mbtidetailID}/`)
          .then(response => {
            console.log(response)
            this.mbtidetail = response.data
          })
          .catch(error => {
            console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
    }
  }

</script>
<template>
<div>
  여기는 카카오페이지
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'kakaoOauth',
    async mounted() {
        const response_code = new URL(window.location.href).searchParams.get('code')
        const kakaoHeader = {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
        try {
            const data = {
                grant_type: 'authorization_code',
                client_id: process.env.VUE_APP_CLIENT_ID,
                redirect_uri: process.env.VUE_APP_REDIRECT_URI,
                code: response_code,
            }
            const queryString = Object.keys(data)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                .join('&')
            const result = await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: kakaoHeader })
            console.log(result.data.access_token)
            if (result.data.access_token) {
                const token = result.data.access_token
                this.$store.commit('setToken', token)
                axios.defaults.headers.common['Authorization'] = 'Token ' + token
                localStorage.setItem('token', token)
                this.$router.push('/dashboard/sign-up')
            } else {
                alert('로그인할 수 없습니다.')
                this.$router.push('/dashboard/log-in')
            }
            return result
        } catch (e) {
            alert('카카오톡 인증에 실패하였습니다.')
            console.log(e)
            return e
        }
    }
}
</script>
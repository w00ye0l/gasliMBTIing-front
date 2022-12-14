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
            
            if (result.data.access_token) {
                const kakaouserinfoHeader = {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': 'Bearer ' + `${result.data.access_token}`
                }
                const userinfo_result = await axios.post('https://kapi.kakao.com/v2/user/me', queryString, { headers: kakaouserinfoHeader })
                const userinfo_email = userinfo_result.data.kakao_account.email
                const userinfo_nickname = userinfo_result.data.properties.nickname
                const userinfo_gender_tmp = userinfo_result.data.kakao_account.gender
                let userinfo_gender = ''
                if (userinfo_gender_tmp == "female") {
                    userinfo_gender = "여"
                } else {
                    userinfo_gender = "남"
                }

                localStorage.setItem('userinfo_email', userinfo_email)
                localStorage.setItem('userinfo_nickname', userinfo_nickname)
                localStorage.setItem('userinfo_gender', userinfo_gender)

                this.$router.push('/kakao_sign-up')
            } else {
                alert('로그인할 수 없습니다.')
                this.$router.push('/log-in')
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
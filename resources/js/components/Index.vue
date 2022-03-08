<template lang="">
    <div>
        <router-link :to="{ name: 'fruits.index' }" >fruits</router-link>
        <router-link v-if='!token' :to="{ name: 'user.login' }" >login</router-link>
        <router-link v-if='!token' :to="{ name: 'user.registr' }" >registr</router-link>
        <router-link v-if='token' :to="{ name: 'user.personal' }" >personal</router-link>
                <a v-if='token' @click.prevent='logout' href="">Выйти</a>
                  <router-view></router-view>
                  
    </div>
</template>
<script>
import api from '../api';
export default {
    name: 'Index',
    data(){
        return{
            token: null
        }
    },
    mounted(){
       this.getToken();
    },
    updated(){
       this.getToken();
    },
    methods:{
        getToken(){
          this.token = localStorage.getItem('access_token');
        },
        logout(){
          api.post('/api/auth/logout').then(res=>{
              localStorage.removeItem('access_token');
               this.$router.push({name:'user.login'});
          });
        }
    }
}
</script>
<style lang="">
    
</style>
<template lang="">
    <div>
        <input v-model='email' type="email" class='form-control mb-3' placeholder='email'>
        <input v-model='password' type="password" class='form-control mb-3' placeholder='password'>
        <div v-if='error' class='text-danger'>{{ error }}</div>
        <input @click.prevent='login' type="submit" value='отправить' class='btn btn-primary'>
    </div>
</template>
<script>
export default {
    name:'Login',
    data(){
        return{
            email:null,
            password:null,
            error:null,
        }
    },
    methods:{
        login(){
            axios.post('/api/auth/login', {email: this.email, password: this.password})
            .then(res=>{
                localStorage.setItem('access_token',res.data.access_token);
                this.$router.push({name:'user.personal'});
            } ).catch(error=>{
               this.error = error.response.data.error;
            } )
        },
        
    },
}
</script>
<style>

</style>
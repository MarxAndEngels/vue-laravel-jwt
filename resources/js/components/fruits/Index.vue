<template lang="">
    <div>
     <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="fruit of fruits">
      <th scope="row">{{ fruit.id }}</th>
      <td>{{ fruit.id }}</td>
      <td>{{ fruit.price }}</td>
    </tr>
  </tbody>
</table>

    </div>
</template>
<script>
import api from '../../api';

export default {
    name:'Index',
    data(){
        return{
            fruits:null,
        }
    },
    mounted(){
       this.getFruits();
    },
    methods:{
        getFruits(){
           api.get('/api/auth/fruits').then(res=>{
            this.fruits = res.data;
           })
        }
    }
}
</script>
<style lang="">
    
</style>
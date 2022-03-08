import Vue from 'vue';
import router from './router';
require('./bootstrap');
import Index from './components/Index';

const app = new Vue({
    el: '#app',
    components:{
        Index
    },
    router
});



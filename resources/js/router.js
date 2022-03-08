import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const route = new VueRouter({
    mode:'history',
    routes: [
        {
            path: "/fruits", 
            component: ()=>{return import('./components/fruits/Index')},
            name: 'fruits.index'    
        },
        {
            path: "/user/login", 
            component: ()=>{return import('./components/user/Login')},
            name: 'user.login'    
        },
        {
            path: "/user/registraton", 
            component: ()=>{return import('./components/user/Registr')},
            name: 'user.registr'    
        },
        {
            path: "/user/personal", 
            component: ()=>{return import('./components/user/Personal')},
            name: 'user.personal'    
        },
        {
            path: "*", 
            component: ()=>{return import('./components/user/Personal')},
            name: '404'    //404 страницу можно сюда 
        },
       ]
    
});

route.beforeEach( (to,from,next)=>{
    const accessToken = localStorage.getItem('access_token');
    if(!accessToken){
        if(to.name === 'user.login' || to.name === 'user.registr'){
            return next()
        }else{
            return next({name: 'user.login'})
        }
    }

    if(to.name === 'user.login' || to.name === 'user.registr' && accessToken){
        return next({name: 'user.personal'})
    }
    //откуда переходили to.name from.name 
  next(); //обработка куда дальше идем
})

export default route;
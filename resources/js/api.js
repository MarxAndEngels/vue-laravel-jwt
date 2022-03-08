import axios from "axios";
import router from "./router";

const api = axios.create(); //вложение во все запросы токена, если api используем

//start запрос
api.interceptors.request.use(config=>{
  if(localStorage.getItem('access_token')){
    //добавляем свои параметры
  config.headers.authorization = 'Bearer ' + localStorage.getItem('access_token')
  }
  return config;
}, error=>{} ) //если ошибка будет //настройка апи

//end request

//start response
api.interceptors.response.use({}, error=>{
  if(error.response.data.message === 'Token has expired'){
      //если токен сгорел пересоздаем ее
       return axios.post('api/auth/refresh',{},{
         //наши заголовки
           headers:{
            'authorization' : 'Bearer ' + localStorage.getItem('access_token')
           }
       }).then(res=>{ 
        localStorage.setItem('access_token',res.data.access_token);

        error.config.headers.authorization = 'Bearer ' + res.data.access_token
       
        return api.request(error.config);
    })
  }
  //токена нет
  if(error.response.status === 401){
    router.push({name: 'user.login' })
   }
} )
//end response
export default api;
import { defineStore } from "pinia";

export const UserStore = defineStore('user', {
    state: () => ({
        user:{
            'name' : '',
            'number' : '',
            },
    }),
    getters: {
        getUserAvaiable(state){
            this.getUserFromStorage();
            return (state.user.number == '') ? false : true;
        },
        getUserName(state){
            return state.user.name;
        },
        getUserNumber(state){
            return state.user.number;
        }
    },
    actions: {
        setUser(userName, userNumber){
            this.user.name = userName;
            this.user.number = userNumber;
            localStorage.setItem('user', JSON.stringify(this.user));            
        },
        getUserFromStorage(){
            if(localStorage.getItem("user")){            
                this.user = JSON.parse(localStorage.getItem("user"));
            };
        },
    }
});
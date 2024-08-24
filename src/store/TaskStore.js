import { defineStore } from 'pinia'
import axios from 'axios'
import logo from '@/assets/pinia.png'

export const useTaskStore = defineStore('tasks',{
    state: () =>({
        tasks : [],
        logo : logo
    }),
    actions : {
        async getTasks(){
            const res = await axios.get('http://localhost:3000/tasks');
            const data = await res.data;
            this.tasks = data;
        },
        async addTask(newTask){
            const task = {
                id : Math.floor(Math.random()*10000).toString,
                name : newTask,
                isEdit : false
            }
            const res = await axios.post('http://localhost:3000/tasks',task);
            console.log(res);
            this.tasks.push(task);
        },
        async editTask(id,name){
            const changeTask = await axios.patch(`http://localhost:3000/tasks/${id}`,{
                name : name
            });
            let task = this.tasks.find(i=>i.id == id);
            task.name = name;
        },
        async deleteTask(id){
            const deleteTask = await axios.delete(`http://localhost:3000/tasks/${id}`);
            if(deleteTask.error){
                return deleteTask.error;
            }
            this.tasks = this.tasks.filter(i=> i.id != id);

        }
    }
})
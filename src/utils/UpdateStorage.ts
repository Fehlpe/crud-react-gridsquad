import User from "../config/data/interfaces/user/user";

export default function updateStorage(userList: User[]){
    localStorage.setItem('users', JSON.stringify(userList))
}
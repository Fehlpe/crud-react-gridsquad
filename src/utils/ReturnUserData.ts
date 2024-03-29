import User from "../config/data/interfaces/user/user";
import searchStorage from "./SearchStorage";

export default function ReturnUserData(){
    const logged = sessionStorage.getItem('logged');
    const userList = searchStorage()
    const loggedUser = userList.find(
        (valor:User) => valor.email === logged
    )
    if(loggedUser){
        return loggedUser
    } 
    return null
}
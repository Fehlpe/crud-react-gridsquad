import User from "../config/data/interfaces/user/user"
import searchStorage from "./SearchStorage"
import updateStorage from "./UpdateStorage";

export default function updateUserData(updatedData: User){
    const userList = searchStorage()
    const userIndex = userList.findIndex((value) => value.email === updatedData.email);
    userList[userIndex] = updatedData;
    updateStorage(userList)
}
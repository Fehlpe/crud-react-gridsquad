import User from "../config/data/interfaces/user/user";

export default function searchStorage(): User[]{
    return JSON.parse(localStorage.getItem('users') || "[]");
}
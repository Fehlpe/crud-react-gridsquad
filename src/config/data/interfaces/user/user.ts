import Task from "../task/task";

export default interface User{
    username:string,
    email: string,
    password: string,
    notes: Task[]
}
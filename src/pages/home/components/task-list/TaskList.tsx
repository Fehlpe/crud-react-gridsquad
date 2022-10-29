import TaskListStyle from "./TaskListStyle";
import { useEffect, useRef, useState } from "react";
import ReturnUserData from "../../../../utils/ReturnUserData";
import User from "../../../../config/data/interfaces/user/user";
import TaskListRows from "../task-list-rows/TaskListRows";
import TaskListCells from "../task-list-cells/TaskListCells";
import { Button, Checkbox, TextField } from "@mui/material";
import updateUserData from "../../../../utils/UpdateUserData";
import Task from "../../../../config/data/interfaces/task/task";
import { lookup } from "dns";

function TaskList(): JSX.Element {
  const [loggedUser, setLoggedUser] = useState<User | null>();
  const [notes, setNotes] = useState<Task[]>();

  useEffect(() => {
    setLoggedUser(ReturnUserData());
  }, []);
  useEffect(() => {
    setNotes(loggedUser?.notes);
  }, [loggedUser]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reset, setReset] = useState(0);
  const titleRef = useRef();
  const descriptionRef = useRef();

  function saveTask(): void {
    const newTask: Task = {
      title: title,
      description,
      id: Math.floor(Math.random() * Date.now()).toString(),
      status: false,
    };
    loggedUser?.notes.push(newTask);
    updateUserData(loggedUser!);
    setNotes(loggedUser?.notes);
  }

  function deleteTask(id:string):void{
    const specificTask = notes?.findIndex((task) => task.id === id);
    if(window.confirm("Deseja deletar esse recado?")){
      loggedUser?.notes.splice(specificTask!, 1)
      updateUserData(loggedUser!)
      setNotes(loggedUser?.notes)
    }
  }

  return (
    <TaskListStyle>
      <TaskListRows>
        <TaskListCells>
          <p className="task-list-head">Status</p>
        </TaskListCells>
        <TaskListCells>
          <TextField
            id="standard-basic"
            label="Tarefa"
            variant="standard"
            fullWidth={true}
            onChange={(e) => setTitle(e.target.value)}
            inputRef={titleRef}
          />
        </TaskListCells>
        <TaskListCells>
          <TextField
            id="standard-basic"
            label="Descrição"
            variant="standard"
            fullWidth={true}
            onChange={(e) => setDescription(e.target.value)}
            inputRef={descriptionRef}
          />
        </TaskListCells>
        <TaskListCells>
          <div className="task-list-actions">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setReset(reset + 1);
                saveTask();
                // @ts-ignore
                titleRef.current.value = "";
                // @ts-ignore
                descriptionRef.current.value = "";
              }}
              variant="contained"
              fullWidth={true}
            >
              Salvar
            </Button>
          </div>
        </TaskListCells>
      </TaskListRows>
      {notes?.map((value) => (
        <TaskListRows id={value.id} key={value.id}>
          <TaskListCells>
            <Checkbox />
          </TaskListCells>
          <TaskListCells>
            <TextField
              id="standard-basic"
              label="Tarefa"
              variant="standard"
              fullWidth={true}
              className="task-list-title"
              value={value.title}
              InputProps={{disableUnderline: true}}
              disabled={true}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </TaskListCells>
          <TaskListCells>
            <TextField
                id="standard-basic"
                label="Tarefa"
                variant="standard"
                fullWidth={true}
                className="task-list-description"
                value={value.description}
                InputProps={{disableUnderline: true}}
                disabled={true}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
              />
          </TaskListCells>
          <TaskListCells>
            <div className="task-list-actions">
              <Button
                variant="outlined"
                fullWidth={true}
                onClick={() => {
                  alert("Você clicou no botão de edição!");
                }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={(e) => {
                  e.preventDefault()
                  deleteTask(value.id)
                  setReset(reset + 1)
                }}
              >
                Excluir
              </Button>
            </div>
          </TaskListCells>
        </TaskListRows>
      ))}
    </TaskListStyle>
  );
}

export default TaskList;

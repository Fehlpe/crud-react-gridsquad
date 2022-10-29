import TaskListStyle from "./TaskListStyle";
import { useEffect, useRef, useState } from "react";
import ReturnUserData from "../../../../utils/ReturnUserData";
import User from "../../../../config/data/interfaces/user/user";
import TaskListRows from "../task-list-rows/TaskListRows";
import TaskListCells from "../task-list-cells/TaskListCells";
import { Button, TextField } from "@mui/material";
import updateUserData from "../../../../utils/UpdateUserData";
import Task from "../../../../config/data/interfaces/task/task";

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
    };
    loggedUser?.notes.push(newTask);
    updateUserData(loggedUser!);
    setNotes(loggedUser?.notes);
  }

  function editTask(id: string) {
    const inputTitle = document.getElementById(id + "1");
    const inputDescription = document.getElementById(id + "2");
    const editButton = document.getElementById(id + "3");
    if (editButton!.innerText === "EDITAR") {
      editButton!.innerText = "SALVAR";
      inputTitle?.removeAttribute("readonly");
      inputTitle?.classList.remove("MuiInputBase-readOnly");
      inputDescription?.removeAttribute("readonly");
      inputDescription?.classList.remove("MuiInputBase-readOnly");
      inputTitle?.focus();
    } else {
      const specificTask = notes?.findIndex((task) => task.id === id);
      editButton!.innerText = "EDITAR";
      inputDescription?.setAttribute("readonly", "readonly");
      inputDescription?.classList.add("MuiInputBase-readOnly");
      inputTitle?.setAttribute("readonly", "readonly");
      inputTitle?.classList.add("MuiInputBase-readOnly");
      //@ts-ignore
      const newTitle = inputTitle.value;
      //@ts-ignore
      loggedUser.notes[specificTask].title = newTitle;
      //@ts-ignore
      const newDescription = inputDescription.value;
      //@ts-ignore
      loggedUser.notes[specificTask].description = newDescription;
      updateUserData(loggedUser!);
      setNotes(loggedUser?.notes);
    }
  }

  function deleteTask(id: string): void {
    const specificTask = notes?.findIndex((task) => task.id === id);
    if (window.confirm("Deseja deletar esse recado?")) {
      loggedUser?.notes.splice(specificTask!, 1);
      updateUserData(loggedUser!);
      setNotes(loggedUser?.notes);
    }
  }

  return (
    <TaskListStyle>
      <TaskListRows>
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
          <div className="task-list-actions-header">
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
            <TextField
              id={value.id + "1"}
              label="Tarefa"
              variant="standard"
              fullWidth={true}
              className="task-list-title"
              defaultValue={value.title}
              InputProps={{
                readOnly: true,
              }}
            />
          </TaskListCells>
          <TaskListCells>
            <TextField
              id={value.id + "2"}
              label="Tarefa"
              variant="standard"
              fullWidth={true}
              className="task-list-description"
              defaultValue={value.description}
              InputProps={{
                readOnly: true,
              }}
            />
          </TaskListCells>
          <TaskListCells>
            <div className="task-list-actions">
              <Button
                id={value.id + "3"}
                variant="outlined"
                fullWidth={true}
                onClick={(e) => {
                  e.preventDefault();
                  editTask(value.id);
                }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={(e) => {
                  e.preventDefault();
                  deleteTask(value.id);
                  setReset(reset + 1);
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

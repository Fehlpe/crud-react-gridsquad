import TaskListStyle from './TaskListStyle'
import { useEffect, useState } from 'react'
import ReturnUserData from '../../../../utils/ReturnUserData'
import User from '../../../../config/data/interfaces/user/user'
import TaskListRows from '../task-list-rows/TaskListRows'
import TaskListCells from '../task-list-cells/TaskListCells'
import { Button, Checkbox, TextField } from '@mui/material'
import updateUserData from '../../../../utils/UpdateUserData'
import Task from '../../../../config/data/interfaces/task/task'


function TaskList(): JSX.Element {
	const [loggedUser, setLoggedUser] = useState<User | null>()
	const [notes, setNotes] = useState<Task[]>()

	useEffect(() => {
		setLoggedUser(ReturnUserData())
	}, []);
	useEffect(() => {
		setNotes(loggedUser?.notes)
	}, [loggedUser])

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [teste, setTeste] = useState(0)

	function saveTask():void {

		const newTask: Task = {
			title: title,
			description,
			id: Math.floor(Math.random() * Date.now()).toString(),
			status: false
		};
		loggedUser?.notes.push(newTask);
		updateUserData(loggedUser!);
		setNotes(loggedUser?.notes)
	}

	return (
		<TaskListStyle>
			<TaskListRows>
				<TaskListCells>
					<p className='task-list-head'>Status</p>
				</TaskListCells>
				<TaskListCells>
					<TextField
						id='standard-basic'
						label='Tarefa'
						variant='standard'
						fullWidth={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</TaskListCells>
				<TaskListCells>
					<TextField
						id='standard-basic'
						label='Descrição'
						variant='standard'
						fullWidth={true}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</TaskListCells>
				<TaskListCells>
					<div className='task-list-actions'>
						<Button onClick={(e) => {
							e.preventDefault()
							setTeste(teste + 1)
							saveTask()
						}} variant='contained' fullWidth={true}>
							Salvar
						</Button>
					</div>
				</TaskListCells>
			</TaskListRows>
			{notes?.map((value) => (
				<TaskListRows key={value.id}>
					<TaskListCells>	
						<Checkbox />
					</TaskListCells>
					<TaskListCells>
						<p className='task-list-title'>{value.title}</p>
					</TaskListCells>
					<TaskListCells>
						<p className='task-list-description'>{value.description}</p>
					</TaskListCells>
					<TaskListCells>
						<div className='task-list-actions'>
							<Button
								variant='outlined'
								fullWidth={true}
								onClick={() => {
									alert('Você clicou no botão de edição!')
								}}
							>
								Editar
							</Button>
							<Button
								variant='contained'
								fullWidth={true}
								onClick={() => {
									alert('Você clicou no botão de exclusão!')
								}}
							>
								Excluir
							</Button>
						</div>
					</TaskListCells>
				</TaskListRows>
			))}
		</TaskListStyle>
	)
}

export default TaskList

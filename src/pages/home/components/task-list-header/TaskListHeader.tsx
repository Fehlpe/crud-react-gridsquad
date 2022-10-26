import TaskListRows from '../task-list-rows/TaskListRows'
import TaskListCells from '../task-list-cells/TaskListCells'
import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import ReturnUserData from '../../../../utils/ReturnUserData'
import User from '../../../../config/data/interfaces/user/user'
import Task from '../../../../config/data/interfaces/task/task'
import updateUserData from '../../../../utils/UpdateUserData'

function TaskListHeader(): JSX.Element {
	const [loggedUser, setLoggedUser] = useState<User | null>()
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		setLoggedUser(ReturnUserData())
	}, [])

	function saveTask():void {
		const newTask: Task = {
			title: title,
			description,
			id: Math.floor(Math.random() * Date.now()),
			status: false
		}

		loggedUser?.notes.push(newTask)
		updateUserData(loggedUser!);
	}

	return (
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
					<Button onClick={saveTask} variant='contained' fullWidth={true}>
						Salvar
					</Button>
				</div>
			</TaskListCells>
		</TaskListRows>
	)
}

export default TaskListHeader

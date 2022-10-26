import TaskListRows from '../task-list-rows/TaskListRows'
import TaskListCells from '../task-list-cells/TaskListCells'
import { Button, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import ReturnUserData from '../../../../utils/ReturnUserData'
import User from '../../../../config/data/interfaces/user/user'

function TaskListBody(): any {
	const [loggedUser, setLoggedUser] = useState<User | null>()
	useEffect(() => {
		setLoggedUser(ReturnUserData())
	}, [])

	return (
			loggedUser?.notes.map((value) => (
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
			))
	)
}

export default TaskListBody

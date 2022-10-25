import taskData from '../../../../config/data/taskData'
import Task from '../../../../config/data/interfaces/task/task'
import { useState } from 'react'
import TaskListRows from '../task-list-rows/TaskListRows'
import TaskListCells from '../task-list-cells/TaskListCells'
import { Button, Checkbox } from '@mui/material'

function TaskListBody(): any {
	return (
		taskData.map((value) => (
			<TaskListRows>
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
	)))
}

export default TaskListBody

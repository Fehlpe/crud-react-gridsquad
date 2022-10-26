import TaskListRowsStyle from './TaskListRowsStyle'

interface TaskListRowsProps {
	children: JSX.Element | JSX.Element[]
}

function TaskListRows(props: TaskListRowsProps): JSX.Element {
	return <TaskListRowsStyle >{props.children}</TaskListRowsStyle>
}

export default TaskListRows

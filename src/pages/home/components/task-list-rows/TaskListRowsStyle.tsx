import styled from 'styled-components'

const TaskListRowsStyle = styled.div`
	align-items: center;
	border-radius: 16px;
	box-shadow: 10px 10px 30px rgb(0, 0, 0, 0.2);
	display: grid;
	grid-column-gap: 32px;
	grid-template-columns: 64px repeat(3, 1fr);
	padding: 12px;
`

export default TaskListRowsStyle

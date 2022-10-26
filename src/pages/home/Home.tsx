import HomeContainer from './components/home-container/HomeContainer'
import Header from './components/header/Header'
import Welcome from './components/welcome/Welcome'
import TaskList from './components/task-list/TaskList'
import ReturnUserData from '../../utils/ReturnUserData'

function Home(): JSX.Element {
	const loggedUser = ReturnUserData()
	return (
		<HomeContainer>
			<Header />
			<Welcome userName={loggedUser?.username ?? ""}/>
			<TaskList />
		</HomeContainer>
	)
}

export default Home

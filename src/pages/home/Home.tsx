import HomeContainer from './components/home-container/HomeContainer'
import Header from './components/header/Header'
import Welcome from './components/welcome/Welcome'
import TaskList from './components/task-list/TaskList'
import ReturnUserData from '../../utils/ReturnUserData'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Home(): JSX.Element {
	const loggedUser = ReturnUserData()
	const navigate = useNavigate();
	useEffect(() => {
		
		const navigateLogin = () => {
			navigate('/')
		}
		if(loggedUser===null){navigateLogin()}
	}, [loggedUser, navigate]) 
	
	return (
		<HomeContainer>
			<Header />
			<Welcome userName={loggedUser?.username ?? ""}/>
			<TaskList />
		</HomeContainer>
	)
}

export default Home

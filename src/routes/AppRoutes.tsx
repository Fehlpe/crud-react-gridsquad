import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Home from '../pages/home/Home'
import ErroPagina  from '../pages/home/components/error-page/ErroPagina'

function AppRoutes(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />}></Route>
				<Route path='/Register' element={<Register />}></Route>
				<Route path='/Home' element={<Home />}></Route>
				<Route path='*' element={<ErroPagina />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import MainPage from './pages//MainPage';
import ExerciseInfo from './pages/ExerciseInfo/ExerciseInfo';



import "./index.css";

function App() {
	return (
		<BrowserRouter>
			<Header />
				<Routes>
						<Route path='/' />
						<Route path="/header" element={<Header />} />
						<Route path='/footer' element={<Footer />} />
						<Route path='/mainPage' element={<MainPage />} />
						<Route path='/exerciseInfo' element={<ExerciseInfo />} />
				</Routes>
			<MainPage />
			<Footer />
		</BrowserRouter>
	);
}

export default App;

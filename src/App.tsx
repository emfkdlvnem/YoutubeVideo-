import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import MainPage from './pages//MainPage';
import ExerciseInfo from './pages/ExerciseInfo/ExerciseInfo';

import ScrollTopButton from './components/common/ScrollTopButton'; 

import "./index.css";

function App() {
	return (
		<BrowserRouter>
			<Header />
				<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path="/header" element={<Header />} />
						<Route path='/footer' element={<Footer />} />
						<Route path='/exerciseInfo' element={<ExerciseInfo />} />
						
						{/* 메인페이지 슬라이드에 따른 페이지 이동 */}
						<Route path='/exerciseInfo/:slideNumber' element={<ExerciseInfo />} />
				</Routes>
			<Footer />
			<ScrollTopButton />
		</BrowserRouter>
	);
}
export default App;

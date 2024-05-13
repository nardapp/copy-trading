import React from 'react'
import Header from './components/Header'
import Strategies from './components/Stretegy'
import './styles/app.scss'

function App() {
	return (
		<div className="wrapper">
			<Header />

			<main>
				<Strategies />
			</main>
		</div>
	)
}

export default App

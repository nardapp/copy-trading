import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from './provider'
import App from './App'

import './scss/style.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider>
		<App />
	</Provider>
)

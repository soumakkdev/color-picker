import { useEffect, useRef } from 'react'
import Hue from './components/Hue'
import Picker from './components/Picker'
import { clamp } from './lib'

function App() {
	return (
		<>
			<Picker />
			<Hue />
		</>
	)
}

export default App

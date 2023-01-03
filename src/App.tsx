import { Toaster } from 'react-hot-toast'
import { ColorProvider } from './components/ColorContext'
import Controls from './components/Controls'
import Picker from './components/Picker'
import Preview from './components/Preview'

export default function App() {
	return (
		<ColorProvider>
			<div className="max-w-7xl mx-auto gap-8 flex">
				<Picker />
				<Preview />
				<Controls />
			</div>
			<Toaster position="bottom-center" />
		</ColorProvider>
	)
}

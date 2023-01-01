import { ColorProvider } from './components/ColorContext'
import Picker from './components/Picker'
import Viewer from './components/Viewer'

export default function App() {
	return (
		<ColorProvider>
			<div className="max-w-7xl mx-auto gap-8 flex">
				<Picker />
				<Viewer />
			</div>
		</ColorProvider>
	)
}

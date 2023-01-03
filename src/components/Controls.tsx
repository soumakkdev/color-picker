import { useContext } from 'react'
import { toColor } from 'react-color-palette'
import { CodeViewer } from './CodeViewer'
import { ColorContext } from './ColorContext'

export default function Controls() {
	const { color, setColor } = useContext(ColorContext)

	function handleChange(id: string, value: string) {
		const temp = {
			...color.rgb,
			[id]: Number(value),
		}
		setColor(toColor('rgb', temp))
	}

	return (
		<div>
			<h3 className="mb-3 text-sm font-semibold uppercase">rgba</h3>

			<div className="flex items-center gap-4">
				<Input id="r" value={color.rgb.r} onChange={handleChange} max={255} />
				<Input id="g" value={color.rgb.g} onChange={handleChange} max={255} />
				<Input id="b" value={color.rgb.b} onChange={handleChange} max={255} />
				<Input id="a" value={color.rgb.a} onChange={handleChange} max={1} step={0.01} />
			</div>

			<div className="my-4">
				<CodeViewer text={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b});`} />
				<CodeViewer text={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a ?? 1});`} />
			</div>
		</div>
	)
}

function Input(props: { id: string; min?: number; max: number; step?: number; value: any; onChange: (id: string, value: string) => void }) {
	const { id, min = 0, max, value = 1, onChange, step } = props
	return (
		<div className="flex justify-center items-center gap-2 bg-zinc-100 p-1.5 pl-3 rounded-xl">
			<label htmlFor={id} className="font-semibold text-base">
				{id}
			</label>
			<input
				id={id}
				value={value}
				onChange={(e) => onChange(id, e.target.value)}
				type="number"
				min={min}
				max={max}
				step={step}
				className="w-20 h-10 font-semibold rounded-lg border-0"
			/>
		</div>
	)
}

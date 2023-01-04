import { useContext } from 'react'
import { toColor } from 'react-color-palette'
import { CodeViewer } from './CodeViewer'
import { ColorContext } from './ColorContext'
import { getFormattedGLSL, getFormattedRGB, rgb2glsl } from './utils'

export default function Controls() {
	return (
		<div>
			<RGBControls />
			<GLSLControls />
		</div>
	)
}

function GLSLControls() {
	const { color, setColor } = useContext(ColorContext)

	function handleChange(id: string, value: string) {}

	const rawGLSL = rgb2glsl(color.rgb)
	const formattedGLSL = getFormattedGLSL(rawGLSL)

	return (
		<div>
			<h3 className="mb-3 text-sm font-semibold uppercase">glsl</h3>

			<div className="flex items-center gap-4">
				<Input id="r" value={rawGLSL.r} onChange={handleChange} max={1} step={0.001} />
				<Input id="g" value={rawGLSL.g} onChange={handleChange} max={1} step={0.001} />
				<Input id="b" value={rawGLSL.b} onChange={handleChange} max={1} step={0.001} />
				<Input id="a" value={rawGLSL.a} onChange={handleChange} max={1} step={0.001} />
			</div>

			<div className="my-4">
				<CodeViewer text={`vec3(${formattedGLSL.r}, ${formattedGLSL.g}, ${formattedGLSL.b});`} />
				<CodeViewer text={`vec4(${formattedGLSL.r}, ${formattedGLSL.g}, ${formattedGLSL.b}, ${formattedGLSL.a});`} />
			</div>
		</div>
	)
}

function RGBControls() {
	const { color, setColor } = useContext(ColorContext)

	function handleChange(id: string, value: string) {
		const temp = {
			...color.rgb,
			[id]: Number(value),
		}
		setColor(toColor('rgb', temp))
	}

	const rgb = getFormattedRGB(color.rgb)

	return (
		<div>
			<h3 className="mb-3 text-sm font-semibold uppercase">rgba</h3>

			<div className="flex items-center gap-4">
				<Input id="r" value={rgb.r} onChange={handleChange} max={255} />
				<Input id="g" value={rgb.g} onChange={handleChange} max={255} />
				<Input id="b" value={rgb.b} onChange={handleChange} max={255} />
				<Input id="a" value={rgb.a} onChange={handleChange} max={1} step={0.01} />
			</div>

			<div className="my-4">
				<CodeViewer text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`} />
				<CodeViewer text={`rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${rgb.a});`} />
				<CodeViewer text={`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a});`} />
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

import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react'
import { toColor } from 'react-color-palette'
import { ColorContext } from './ColorContext'

export default function Preview() {
	const { color } = useContext(ColorContext)
	return (
		<div className="flex flex-col gap-8">
			<div className="h-40 w-40 rounded-2xl" style={{ backgroundColor: color.hex }}></div>
			<ColorInput />
		</div>
	)
}

function ColorInput() {
	const { color, setColor } = useContext(ColorContext)
	const [text, setText] = useState(color.hex)

	useEffect(() => {
		setText(color.hex)
	}, [color.hex])

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const val = e.target.value
		setText(val)
	}

	function handleKeydown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter') {
			// validate for #00ffff80, #00ffff, #0ff
			if (/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(text)) {
				setColor(toColor('hex', text))
			}
		}
	}

	return (
		<input
			type="text"
			maxLength={9}
			className="font-code font-semibold rounded-xl border border-gray-300"
			value={text}
			onChange={handleChange}
			onKeyDown={handleKeydown}
		/>
	)
}

import React, { useContext } from 'react'
import { toColor, useColor } from 'react-color-palette'
import { useAtom } from 'jotai'
import { ColorContext } from './ColorContext'

export default function Viewer() {
	const { color, setColor } = useContext(ColorContext)
	return (
		<div className="flex flex-col gap-8">
			<div className="h-40 w-40 rounded-2xl" style={{ backgroundColor: color.hex }}></div>
			<input
				type="text"
				className="rounded-xl border border-gray-300"
				value={color.hex}
				onChange={(e) => {
					const val = e.target.value
					setColor(toColor('hex', val))
				}}
			/>
		</div>
	)
}

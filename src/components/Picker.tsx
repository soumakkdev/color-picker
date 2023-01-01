import { useAtom } from 'jotai'
import React, { useContext } from 'react'
import { useColor, ColorPicker } from 'react-color-palette'
import 'react-color-palette/lib/css/styles.css'
import { ColorContext } from './ColorContext'

export default function Picker() {
	const { color, setColor } = useContext(ColorContext)

	return <ColorPicker width={400} height={400} color={color} onChange={setColor} alpha hideHSV hideHEX hideRGB />
}

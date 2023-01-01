import React from 'react'
import { useSnapshot } from 'valtio'
import { colorToRgb, finalColorState } from './utils'

export default function Viewer() {
	const finalColor = useSnapshot(finalColorState)
	return <div style={{ height: '200px', width: '200px', background: colorToRgb(finalColor.color) }}></div>
}

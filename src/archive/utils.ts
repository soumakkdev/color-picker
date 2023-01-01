import { proxy } from 'valtio'

export const baseColorState = proxy({ color: { r: 255, g: 0, b: 0 } })
export const finalColorState = proxy({ color: { r: 255, g: 0, b: 0 } })

export function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max)
}

export function scale(number: number, inMin: number, inMax: number, outMin: number, outMax: number) {
	return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function colorToRgb(color: { r: number; g: number; b: number }) {
	return `rgb(${color.r}, ${color.g}, ${color.b})`
}

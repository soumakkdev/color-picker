export function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max)
}

export function scale(number: number, inMin: number, inMax: number, outMin: number, outMax: number) {
	return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

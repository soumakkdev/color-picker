import { Color } from 'react-color-palette'

export function rgb2glsl({ r, g, b, a }: Color['rgb']) {
	r /= 255
	g /= 255
	b /= 255

	r = Number(parseFloat(r.toString()).toFixed(2))
	g = Number(parseFloat(g.toString()).toFixed(2))
	b = Number(parseFloat(b.toString()).toFixed(2))

	if (a) {
		a = Number(parseFloat(a.toString()).toFixed(2))
		if (a % 1 === 0) {
			a = Number(`${a}.0`)
		}
	}

	return { r, g, b, a }
}

export function getFormattedRGB({ r, g, b, a = 1 }: Color['rgb']) {
	if (a) a = Number(parseFloat(a?.toString()).toFixed(2))

	return { r, g, b, a }
}

export function getFormattedGLSL({ r, g, b, a = 1 }: Color['rgb']) {
	if (a) a = Number(parseFloat(a?.toString()).toFixed(2))

	return { r: getGLSLFormat(r), g: getGLSLFormat(g), b: getGLSLFormat(b), a: getGLSLFormat(a) }
}

function getGLSLFormat(value: number) {
	let temp = value.toString()
	if (value % 1 === 0) {
		temp = `${value}.0`
	}
	return temp
}

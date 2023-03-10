import { useEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'
import { baseColorState, clamp, colorToRgb, finalColorState } from './utils'

export default function Picker() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const handleRef = useRef<HTMLDivElement>(null)
	const baseColor = useSnapshot(baseColorState)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d', {
			willReadFrequently: true,
		})

		if (ctx && canvas) {
			const { width, height } = canvas

			// solid color
			ctx.fillStyle = colorToRgb(baseColor.color)
			ctx.fillRect(0, 0, width, height)

			// white horizontal gradient
			const gradientH = ctx.createLinearGradient(0, 0, width, 0)
			gradientH.addColorStop(0, 'rgba(255, 255, 255, 1)')
			gradientH.addColorStop(1, 'rgba(255, 255, 255, 0)')
			ctx.fillStyle = gradientH
			ctx.fillRect(0, 0, width, height)

			// black vertical gradient
			const gradientV = ctx.createLinearGradient(0, 0, 0, height)
			gradientV.addColorStop(0, 'rgba(0, 0, 0, 0)')
			gradientV.addColorStop(1, 'rgba(0, 0, 0, 1)')
			ctx.fillStyle = gradientV
			ctx.fillRect(0, 0, width, height)
		}
	}, [baseColor.color])

	function handleMouseMove(e: MouseEvent) {
		const handle = handleRef.current
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d', {
			willReadFrequently: true,
		})

		if (handle && canvas && ctx) {
			const rect = canvas.getBoundingClientRect()

			let x = clamp(e.clientX - rect.left, 0, canvas.width)
			let y = clamp(e.clientY - rect.top, 0, canvas.height)

			handle.style.left = `${x - handle.offsetWidth / 2}px`
			handle.style.top = `${y - handle.offsetHeight / 2}px`

			const imgData = ctx.getImageData(x, y, 1, 1)
			const [r, g, b] = imgData.data

			finalColorState.color = { r, g, b }
			// console.log(x, y, r, g, b)
		}
	}

	function handleMouseDown(e: MouseEvent) {
		handleMouseMove(e)
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	function handleMouseUp() {
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mouseup', handleMouseUp)
	}

	useEffect(() => {
		canvasRef.current?.addEventListener('mousedown', handleMouseDown)
		handleRef.current?.addEventListener('mousedown', handleMouseDown)

		return () => {
			canvasRef.current?.removeEventListener('mousedown', handleMouseDown)
			handleRef.current?.removeEventListener('mousedown', handleMouseDown)
		}
	}, [])

	return (
		<div id="picker">
			<canvas ref={canvasRef} height={500} width={500}></canvas>
			<div id="handle" ref={handleRef}></div>
		</div>
	)
}

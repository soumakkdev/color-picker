import { useEffect, useRef } from 'react'
import { clamp, baseColorState } from './utils'

export default function Hue() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const handleRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d', {
			willReadFrequently: true,
		})

		if (ctx && canvas) {
			const { width, height } = canvas

			// rainbow gradient
			const gradient = ctx.createLinearGradient(0, 0, width, 0)
			gradient.addColorStop(0, 'rgb(255, 0, 0)') //red
			gradient.addColorStop(1 / 6, 'rgb(255, 255, 0)') //yellow
			gradient.addColorStop(2 / 6, 'rgb(0, 255, 0)') //green
			gradient.addColorStop(3 / 6, 'rgb(0, 255, 255)') //cyan
			gradient.addColorStop(4 / 6, 'rgb(0, 0, 255)') //blue
			gradient.addColorStop(5 / 6, 'rgb(255, 0, 255)') //pink
			gradient.addColorStop(1, 'rgb(255, 0, 0)') //red
			ctx.fillStyle = gradient
			ctx.fillRect(0, 0, width, height)
		}
	}, [])

	function handleMouseMove(e: MouseEvent) {
		const handle = handleRef.current
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d', {
			willReadFrequently: true,
		})

		if (handle && canvas && ctx) {
			const rect = canvas.getBoundingClientRect()

			let x = clamp(e.clientX - rect.left, 0, canvas.width)
			let y = canvas.height / 2 // y pos will be in the center of canvas

			handle.style.left = `${x - handle.offsetWidth / 2}px`

			const imgData = ctx.getImageData(x, y, 1, 1)
			const [r, g, b] = imgData.data

			baseColorState.color = { r, g, b }

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
		<div id="hue">
			<canvas ref={canvasRef} height={10} width={500}></canvas>
			<div id="handle" ref={handleRef}></div>
		</div>
	)
}

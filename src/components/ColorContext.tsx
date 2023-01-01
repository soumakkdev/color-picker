import React, { createContext, ReactNode } from 'react'
import { Color, useColor } from 'react-color-palette'

interface IColorContext {
	color: Color
	setColor: (c: Color) => void
}

export const ColorContext = createContext<IColorContext>({} as IColorContext)

export const ColorProvider = (props: { children: ReactNode }) => {
	const { children } = props
	const [color, setColor] = useColor('hex', '#2797ff')

	return (
		<ColorContext.Provider
			value={{
				color,
				setColor,
			}}
		>
			{children}
		</ColorContext.Provider>
	)
}

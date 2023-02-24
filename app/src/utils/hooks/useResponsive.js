import { useEffect, useState } from 'react'
import {screenBreakpoint} from "../../configs/screen.config";


const breakpoint = {
	xxl: parseInt(screenBreakpoint.xxl),  // 1536
	xl: parseInt(screenBreakpoint.xl), // 1280
	lg: parseInt(screenBreakpoint.lg), // 1024
	md: parseInt(screenBreakpoint.md), // 768
	sm: parseInt(screenBreakpoint.sm), // 640
	xs: parseInt(screenBreakpoint.xs), // 576
}

const useResponsive = () => {

	const getAllSizes = (comparator = 'smaller') => {
		const currentWindowWidth = window.innerWidth
		return Object.fromEntries(
			Object.entries(breakpoint).map(
				([key, value]) => [key, comparator === 'larger' ? (currentWindowWidth > value) : (currentWindowWidth < value)]
			)
		)
	}

	const getResponsiveState = () => {
		const currentWindowWidth = window.innerWidth
		return { 
			windowWidth: currentWindowWidth,
			larger: getAllSizes('larger'),
			smaller: getAllSizes('smaller')
		}
	}

	const [responsive, setResponsive] = useState(getResponsiveState())

	const resizeHandler = () => {
		const responsiveState = getResponsiveState()
		setResponsive(responsiveState)
	}

	useEffect(() => {
		window.addEventListener('resize', resizeHandler)
		return () => window.removeEventListener('resize', resizeHandler)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [responsive.windowWidth])

	return responsive
}

export default useResponsive
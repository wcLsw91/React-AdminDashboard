import React from 'react'
import { useSelector } from 'react-redux'
import { themeConfig } from 'configs/theme.config'
import ConfigProvider from "../ui/ConfigProvider/ConfigProvider";

const Theme = props => {

	const theme = useSelector(state => state.theme)

	const currentTheme = {
		...themeConfig,
		...theme
	}

	return (
		<>
			<ConfigProvider value={currentTheme}>
				{props.children}
			</ConfigProvider>
		</>
	)
}

export default Theme

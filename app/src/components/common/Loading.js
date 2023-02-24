import React from 'react'
import PropTypes from 'prop-types'
import {CircularProgress} from "@mui/material";


const Loading = props => {
	const {
		loading,
		children
	} = props

	return (
		loading ?
			<><CircularProgress /></>
			:
			<>{children}</>
	)
}

Loading.defaultProps = {
	loading: false,
}

Loading.propTypes = {
	loading: PropTypes.bool,
}

export default Loading

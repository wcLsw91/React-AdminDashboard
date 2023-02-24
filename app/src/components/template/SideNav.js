import {
	LOGO_X_GUTTER,
	SIDE_NAV_COLLAPSED_WIDTH,
	SIDE_NAV_CONTENT_GUTTER,
	SIDE_NAV_WIDTH
} from "constants/theme.constant";
import {useSelector} from "react-redux";
import navigationConfig from "configs/navigation.config";
import VerticalMenuContent from "components/template/VerticalMenuContent";
import classNames from "classnames";
import useResponsive from "utils/hooks/useResponsive";
import Logo from "components/template/Logo";
import PropTypes from "prop-types";
import {ScrollBar} from "components/ui";


const sideNavStyle = {
	width: SIDE_NAV_WIDTH,
	minWidth: SIDE_NAV_WIDTH
}

const sideNavCollapseStyle = {
	width: SIDE_NAV_COLLAPSED_WIDTH,
	minWidth: SIDE_NAV_COLLAPSED_WIDTH
}

const SideNav = () => {
	const themeColor = useSelector(state => state.theme.themeColor)
	const navMode = useSelector(state => state.theme.navMode)
	const mode = useSelector(state => state.theme.mode)
	const currentRouteKey = useSelector(state => state.base.common.currentRouteKey)
	const sideNavCollapse = useSelector(state => state.theme.layout.sideNavCollapse)
	const userAuthority = useSelector((state) => state.auth.user.authority)

	const { larger } = useResponsive()

	const sideNavColor = () => {
		return `side-nav-${navMode}`
	}

	const logoMode = () => {
		return navMode
	}

	const menuContent = (
		<VerticalMenuContent
			navMode={navMode}
			collapsed={sideNavCollapse}
			navigationTree={navigationConfig}
			routeKey={currentRouteKey}
			userAuthority={userAuthority}
		/>
	)

	return (
		<>
			{larger.md && (
				<div
					style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle }
					className={
						classNames(
							'side-nav',
							sideNavColor(),
							!sideNavCollapse && 'side-nav-expand'
						)
					}
				>
					<div className="side-nav-header">
						<Logo
							mode={logoMode()}
							type={sideNavCollapse ? 'short' : 'full'}
							gutter={sideNavCollapse ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER}
						/>
					</div>
					{
						sideNavCollapse ?
							menuContent
							:
							<div className="side-nav-content">
								<ScrollBar autoHide>
									{menuContent}
								</ScrollBar>
							</div>
					}
				</div>
			)}
		</>
	)

}

SideNav.propTypes = {
	themed: PropTypes.bool,
	darkMode: PropTypes.bool,
	themeColor: PropTypes.string
}

SideNav.defaultProps = {
	themed: false,
	darkMode: false,
	themeColor: ''
}

export default SideNav
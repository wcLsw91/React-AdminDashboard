import React, { useState, Suspense, lazy } from 'react'
import classNames from 'classnames'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import navigationConfig from 'configs/navigation.config'
import useResponsive from 'utils/hooks/useResponsive'
import { useSelector } from 'react-redux'
import { Drawer } from "components/ui";
import NavToggle from "components/common/NavToggle";

const VerticalMenuContent = lazy(() => import('components/template/VerticalMenuContent'))

const MobileNavToggle = withHeaderItem(NavToggle)

const MobileNav = () => {

	const [isOpen, setIsOpen] = useState(false)

	const openDrawer = () => {
		setIsOpen(true)
	}

	const onDrawerClose = e => {
		setIsOpen(false)
	}

	const navMode = useSelector(state => state.theme.navMode)
	const currentRouteKey = useSelector(state => state.base.common.currentRouteKey)
	const sideNavCollapse = useSelector(state => state.theme.layout.sideNavCollapse)
	const userAuthority = useSelector((state) => state.auth.user.authority)

	const { smaller } = useResponsive()
 
	const navColor = () => {
		return `side-nav-${navMode}`
	}

	return (
		<>
			{smaller.md && (
				<>
					<div className="text-2xl" onClick={openDrawer}>
						<MobileNavToggle toggled={isOpen} />
					</div>
					<Drawer
						title="Navigation"
						isOpen={isOpen}
						onClose={onDrawerClose}
						onRequestClose={onDrawerClose}
						bodyClass={classNames(navColor(), 'p-0')}
						width={330}
					>
						<Suspense fallback={<></>}>
							{isOpen && (
								<VerticalMenuContent
									navMode={navMode} 
									collapsed={sideNavCollapse}
									navigationTree={navigationConfig}
									routeKey={currentRouteKey}
									userAuthority={userAuthority}
									onMenuItemClick={onDrawerClose}
								/>
							)}
						</Suspense>
					</Drawer>
				</>
			)}
		</>
	)
}

export default MobileNav
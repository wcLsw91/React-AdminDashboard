import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import VerticalSingleMenuItem from './VerticalSingleMenuItem'
import VerticalCollapsedMenuItem from './VerticalCollapsedMenuItem'
import {themeConfig} from 'configs/theme.config'
import {NAV_ITEM_TYPE_COLLAPSE, NAV_ITEM_TYPE_ITEM, NAV_ITEM_TYPE_TITLE,} from 'constants/navigation.constant'
import useMenuActive from 'utils/hooks/useMenuActive'
import Menu from "components/ui/Menu";

const { MenuGroup } = Menu

const VerticalMenuContent = props => {

   const {
      navMode = themeConfig.navMode,
      collapsed,
      routeKey,
      navigationTree = [],
      userAuthority = [],
      onMenuItemClick,
   } = props


   const [defaulExpandKey, setDefaulExpandKey] = useState([])

   const { activedRoute } = useMenuActive(navigationTree, routeKey)

   useEffect(() => {
      if (defaulExpandKey.length === 0 && activedRoute?.parentKey) {
         setDefaulExpandKey([activedRoute?.parentKey])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activedRoute?.parentKey])

   const handleLinkClick = () => {
      onMenuItemClick?.()
   }

   const getNavItem = nav => {

      if(nav.subMenu.length === 0 && nav.type === NAV_ITEM_TYPE_ITEM) {
         return (
            <VerticalSingleMenuItem
               key={nav.key}
               nav={nav}
               onLinkClick={handleLinkClick}
               sideCollapsed={collapsed}
               userAuthority={userAuthority}
            />
         )
      }

      if(nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
         return (
            <VerticalCollapsedMenuItem
               key={nav.key}
               nav={nav}
               onLinkClick={onMenuItemClick}
               sideCollapsed={collapsed}
               userAuthority={userAuthority}
            />
         )
      }

      if(nav.type === NAV_ITEM_TYPE_TITLE) {

         if (nav.subMenu.length > 0) {
            return (
               <MenuGroup key={nav.key} label={nav.title }>
                  {
                     nav.subMenu.map(subNav => (
                        subNav.subMenu.length > 0
                           ?
                           <VerticalCollapsedMenuItem
                              key={subNav.key}
                              nav={subNav}
                              onLinkClick={onMenuItemClick}
                              sideCollapsed={collapsed}
                              userAuthority={userAuthority}
                           />
                           :
                           <VerticalSingleMenuItem
                              key={subNav.key}
                              nav={subNav}
                              onLinkClick={onMenuItemClick}
                              sideCollapsed={collapsed}
                              userAuthority={userAuthority}
                           />
                     ))
                  }
               </MenuGroup>
            )
         } else {
            <MenuGroup label={nav.title} />
         }
      }
   }

   return (
      <Menu
         className="px-4 pb-4"
         variant={navMode}
         sideCollapsed={collapsed}
         defaultActiveKeys={activedRoute?.key ? [activedRoute.key] : []}
         defaultExpandedKeys={defaulExpandKey}
      >
         {navigationTree.map(nav =>  getNavItem(nav))}
      </Menu>
   )
}

VerticalMenuContent.propTypes = {
   navMode: PropTypes.oneOf(['light', 'dark']),
   collapsed: PropTypes.bool,
   routeKey: PropTypes.string,
   navigationTree: PropTypes.array,
   userAuthority: PropTypes.array,
}

export default VerticalMenuContent

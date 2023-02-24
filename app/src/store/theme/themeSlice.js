import {createSlice} from '@reduxjs/toolkit'
import {themeConfig} from 'configs/theme.config'
import {
   NAV_MODE_LIGHT,
   NAV_MODE_DARK,
   MODE_DARK,
   MODE_LIGHT
} from 'constants/theme.constant'

const initialState = {
   themeColor: themeConfig.themeColor,
   mode: themeConfig.mode,
   navMode: themeConfig.navMode,
   layout: themeConfig.layout,
}

export const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setMode: (state, action) => {

         const availableColorNav = themeConfig.availableNavColorLayouts.includes(state.layout.type)

         if (availableColorNav && action.payload === MODE_DARK) {
            state.navMode = NAV_MODE_DARK
         }
         if (availableColorNav && action.payload === MODE_LIGHT) {
            state.navMode = NAV_MODE_LIGHT
         }
         state.mode = action.payload
      },
      setLayout: (state, action) => {
         state.layout = {
            ...state.layout,
            ...{type: action.payload}
         }
      },
      setPreviousLayout: (state, action) => {
         state.layout.previousType = action.payload
      },
      setSideNavCollapse: (state, action) => {
         state.layout = {
            ...state.layout,
            ...{sideNavCollapse: action.payload}
         }
      },
      setNavMode: (state, action) => {
         if (action.payload !== 'default') {
            state.navMode = action.payload
         } else {
            const availableColorNav = themeConfig.availableNavColorLayouts.includes(state.layout.type)

            if (availableColorNav && state.mode === MODE_LIGHT) {
               state.navMode = NAV_MODE_LIGHT
            }

            if (availableColorNav && state.mode === MODE_DARK) {
               state.navMode = NAV_MODE_DARK
            }
         }
      },
      setThemeColor: (state, action) => {
         state.themeColor = action.payload
      },
   },
})

export const {
   setMode,
   setLayout,
   setSideNavCollapse,
   setNavMode,
   setThemeColor,
   setPreviousLayout
} = themeSlice.actions

export default themeSlice.reducer
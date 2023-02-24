import React, {lazy, memo, Suspense, useMemo} from 'react'
import {useSelector} from 'react-redux'
import Loading from "components/common/Loading";
import {LAYOUT_TYPE_CLASSIC,} from 'constants/theme.constant'

const layouts = {
	[LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
	// Unlock all layouts in full version
}

const Layout = () => {

	const layoutType = useSelector((state) => state.theme.layout.type)

	// const { authenticated } = useAuth()


	const AppLayout = useMemo(() => {
		// if (authenticated) {
			return layouts[layoutType]
		// }
		// return lazy(() => import('./AuthLayout'))
	}, [layoutType])  //layoutType, authenticated 가 바뀔 때만 AppLayout 리렌더링
	// }, [layoutType, authenticated])  //layoutType, authenticated 가 바뀔 때만 AppLayout 리렌더링

	return (
		<Suspense 
			fallback={
				<div className="flex flex-auto flex-col h-[100vh]">
					<Loading loading={true} />
				</div>
			}
		>
			<AppLayout />
		</Suspense>
	)
}

export default memo(Layout)
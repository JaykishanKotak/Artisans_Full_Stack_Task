import type { RouteObject } from 'react-router-dom'
import { CommonLayout } from '@/layouts/common/CommonLayout'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <CommonLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                async lazy() {
                    const { default: DashboardPage } = await import('@/pages/user/dashboard/Dashboard')
                    return { Component: DashboardPage }
                },
            },
            {
                path: 'profile',
                async lazy() {
                    const { default: Profile } = await import('@/pages/user/profile/Profile')
                    return { Component: Profile }
                },
            },
        ],
    },
]


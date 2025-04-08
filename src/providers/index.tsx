/**
 * Root Providers Component
 * Wraps the application with necessary providers for:
 * - Theme management (dark/light mode)
 * - Query handling (React Query)
 * 
 * This component ensures consistent state management and theming
 * across the entire application.
 */

"use client"

import { QueryProvider } from "@/providers/queryProvider"
import { ThemeProvider } from "@/providers/themeProvider"

interface ProvidersProps {
	children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<QueryProvider>{children}</QueryProvider>
		</ThemeProvider>
	)
}

/**
 * Header Component
 * Main navigation header for the application
 */

import Link from "next/link"
import { Brand } from "@/components/ui/brand"

export const Header = () => {
	return (
		<header className="border-b bg-white py-4">
			<div className="container flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Brand />
				</div>
				<div className="text-sm text-pink-500">Unwrap your subtitles</div>
			</div>
		</header>
	)
}
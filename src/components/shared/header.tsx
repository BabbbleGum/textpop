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
					<Link href="/" className="flex items-center gap-2">
						<Brand.Logo />
						<Brand.Text className="text-xl font-semibold text-gray-700" />
					</Link>
				</div>
				<div className="text-sm text-pink-500">Unwrap your subtitles</div>
			</div>
		</header>
	)
}
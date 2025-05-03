/**
 * Header Component
 * Main navigation header for the application
 */

import Link from "next/link"

export const Header = () => {
	return (
		<header className="border-b bg-white py-4">
			<div className="container flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<div 
							style={{
								width: "24px", 
								height: "24px", 
								borderRadius: "50%", 
								backgroundColor: "#FF69B4", 
								border: "2px solid #333"
							}}
						/>
						<span className="text-xl font-semibold text-pink-500">TextPop</span>
					</Link>
				</div>
				<div className="text-sm text-pink-500">Unwrap your subtitles</div>
			</div>
		</header>
	)
}
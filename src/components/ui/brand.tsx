import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Brand component for the application
 * Provides Logo and Text components for flexible branding
 */
const Brand = () => {
	return (
		<Link href="/" className="flex items-center gap-2">
			<Logo />
			<Text />
		</Link>
	)
}

/**
 * Logo component for the application brand
 */
const Logo = ({ className }: { className?: string }) => {
	return (
		<div className={cn("flex items-center justify-center", className)}>
			<svg 
				width="30" 
				height="30" 
				viewBox="0 0 60 56" 
				fill="none" 
				xmlns="http://www.w3.org/2000/svg"
				className="h-8 w-8"
			>
				{/* Speech bubble shape */}
				<path d="M50 0H10C4.5 0 0 4.5 0 10V35C0 40.5 4.5 45 10 45H15V55L30 45H50C55.5 45 60 40.5 60 35V10C60 4.5 55.5 0 50 0Z" fill="#F94B97"/>
				
				{/* Text lines */}
				<rect x="15" y="13" width="30" height="5" rx="2.5" fill="white"/>
				<rect x="15" y="22" width="30" height="5" rx="2.5" fill="white"/>
				<rect x="15" y="31" width="20" height="5" rx="2.5" fill="white"/>
				
				{/* Screen corner */}
				<rect x="35" y="25" width="10" height="10" rx="2" fill="#4DD0F0"/>
			</svg>
		</div>
	)
}

/**
 * Text component for the application brand
 */
const Text = ({ className }: { className?: string }) => {
	return (
		<span className={cn("text-xl font-semibold text-gray-700", className)}>
			TextPop
		</span>
	)
}

// Attach subcomponents to the Brand component
Brand.Logo = Logo
Brand.Text = Text

export { Brand }
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
				width="24" 
				height="24" 
				viewBox="0 0 24 24" 
				fill="none" 
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
			>
				<rect x="2" y="4" width="20" height="16" rx="2" fill="#e8518c" />
				<path d="M6 8H18" stroke="white" strokeWidth="2" strokeLinecap="round" />
				<path d="M6 12H18" stroke="white" strokeWidth="2" strokeLinecap="round" />
				<path d="M6 16H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
			</svg>
		</div>
	)
}

/**
 * Text component for the application brand
 */
const Text = ({ className }: { className?: string }) => {
	return (
		<span className={cn("text-xl font-semibold", className)}>
			TextPop
		</span>
	)
}

// Attach subcomponents to the Brand component
Brand.Logo = Logo
Brand.Text = Text

export { Brand }
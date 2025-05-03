import Link from "next/link"
import Image from "next/image"
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
		<div className={cn("flex items-center", className)}>
			<Image 
				src="/TextPopLogo.png" 
				alt="TextPop Logo" 
				width={24} 
				height={24} 
				className="h-6 w-6"
			/>
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
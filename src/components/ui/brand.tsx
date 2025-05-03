import Link from "next/link"
import { FileText } from "lucide-react"
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
			{/* Using a simple div with background image instead of Next.js Image component */}
			<div 
				className="h-6 w-6 bg-contain bg-center bg-no-repeat" 
				style={{ backgroundImage: "url('/TextPopLogo.png')" }}
				role="img"
				aria-label="TextPop Logo"
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
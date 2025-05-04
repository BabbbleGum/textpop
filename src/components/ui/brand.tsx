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
		<div className={cn("flex items-center", className)}>
			<div className="relative w-8 h-8 flex items-center justify-center">
				<img 
					src="/textpoplogo.svg"
					alt="TextPop Logo" 
					className="w-full h-auto" 
					style={{ 
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "contain",
						objectPosition: "center"
					}}
				/>
			</div>
		</div>
	)
}

/**
 * Text component for the application brand
 */
const Text = ({ className }: { className?: string }) => {
	return (
		<span className={cn("font-bold text-xl", className)}>TextPop</span>
	)
}

export { Brand, Logo, Text }
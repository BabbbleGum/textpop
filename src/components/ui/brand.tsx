import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Brand component for the application
 * Just displays text that says TextPop
 */
const Brand = () => {
	return (
		<Link href="/" className="flex items-center">
			<span className="font-bold text-xl">TextPop</span>
		</Link>
	)
}

export { Brand }
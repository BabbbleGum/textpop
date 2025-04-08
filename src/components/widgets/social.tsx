import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { siteConfig } from "@/config"
import { Button } from "@/components/ui/button"

export function Social() {
	return (
		<div className="flex items-center gap-2">
			<Button variant="ghost" size="icon" asChild>
				<Link
					href={siteConfig.links.github}
					rel="noopener noreferrer"
					target="_blank"
					aria-label="GitHub"
				>
					<Github className="h-5 w-5" />
				</Link>
			</Button>
			<Button variant="ghost" size="icon" asChild>
				<Link
					href={siteConfig.links.twitter}
					rel="noopener noreferrer"
					target="_blank"
					aria-label="Twitter"
				>
					<Twitter className="h-5 w-5" />
				</Link>
			</Button>
			<Button variant="ghost" size="icon" asChild>
				<Link
					href={siteConfig.links.linkedin}
					rel="noopener noreferrer"
					target="_blank"
					aria-label="LinkedIn"
				>
					<Linkedin className="h-5 w-5" />
				</Link>
			</Button>
		</div>
	)
}

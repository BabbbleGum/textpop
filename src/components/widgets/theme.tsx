/**
 * Theme Component
 * Provides theme switching functionality between light, dark, and system preferences
 * 
 * Features:
 * - Interactive theme toggle button
 * - Dropdown menu for theme selection
 * - Smooth transition animations for theme icons
 * - Accessibility support with ARIA labels
 */

"use client"

import { useTheme } from "next-themes"

import { Icons } from "@/icons"

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/ui"

export function Theme() {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			{/* Theme toggle button with animated icons */}
			<DropdownMenuTrigger className="border-none" asChild>
				<Button variant="outline" size="icon">
					{/* Sun icon - visible in light mode */}
					<Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					{/* Moon icon - visible in dark mode */}
					<Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>

			{/* Theme selection dropdown */}
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

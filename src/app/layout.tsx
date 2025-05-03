/**
 * Root layout component that wraps the entire application
 * Implements the base structure, providers, and global styles
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "@/providers"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Header } from "@/shared"
import { siteConfig } from "@/config/site"

import "./globals.css"

// Initialize Inter font with Latin subset for optimal performance
const inter = Inter({ subsets: ["latin"] })

// Define metadata for SEO and social sharing
export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	icons: {
		icon: "/TextPopLogo.png",
		apple: "/TextPopLogo.png"
	}
}

/**
 * RootLayout component
 * Provides the foundational structure for all pages:
 * - Sets HTML language
 * - Applies Inter font
 * - Wraps content in necessary providers (Theme, Query)
 * - Includes global header and performance monitoring
 */
export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Header />

					<main className="flex flex-col">{children}</main>
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	)
}
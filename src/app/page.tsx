/**
 * Home Page Component
 * Main landing page for the TextPop application
 * Handles VTT file upload and text conversion functionality
 */

"use client"

import { useState } from "react"
import { FileUploader } from "@/components/conversion/FileUploader"
import { TextPreview } from "@/components/conversion/TextPreview"
import { ParsedSubtitle } from "@/types/subtitles"
import { Toaster } from "sonner"
import { FileText } from "lucide-react"

export default function Home() {
	// State to store the parsed subtitles after file processing
	const [parsedSubtitles, setParsedSubtitles] = useState<ParsedSubtitle | null>(null)

	// Handler to reset the application state
	const handleReset = () => {
		setParsedSubtitles(null)
	}

	return (
		<main className="container mx-auto px-4 py-12">
			<div className="mx-auto max-w-4xl space-y-10">
				{/* Hero Section */}
				<div className="text-center space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
						VTT to Text Converter
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
						Convert your VTT subtitle files into clean, readable plain text
					</p>
				</div>

				{/* Conditional Rendering: Show either FileUploader or TextPreview */}
				{!parsedSubtitles ? (
					<>
						{/* File Upload Section */}
						<FileUploader onFileProcessed={setParsedSubtitles} />
						
						{/* Features Grid */}
						<div className="grid md:grid-cols-3 gap-8 my-12">
							{/* Feature 1: Simple Conversion */}
							<div className="flex flex-col items-center text-center p-4">
								<div className="bg-primary/10 p-3 rounded-full mb-4">
									<FileText className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-medium text-lg mb-2">Simple Conversion</h3>
								<p className="text-muted-foreground text-sm">Upload your VTT subtitle file and get clean text instantly</p>
							</div>
							
							{/* Feature 2: Smart Cleaning */}
							<div className="flex flex-col items-center text-center p-4">
								<div className="bg-primary/10 p-3 rounded-full mb-4">
									<FileText className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-medium text-lg mb-2">Smart Cleaning</h3>
								<p className="text-muted-foreground text-sm">Removes timestamps, tags, and duplicate text automatically</p>
							</div>
							
							{/* Feature 3: AI-Ready Text */}
							<div className="flex flex-col items-center text-center p-4">
								<div className="bg-primary/10 p-3 rounded-full mb-4">
									<FileText className="h-6 w-6 text-primary" />
								</div>
								<h3 className="font-medium text-lg mb-2">AI-Ready Text</h3>
								<p className="text-muted-foreground text-sm">Get clean text perfect for AI tools and transcription analysis</p>
							</div>
						</div>
					</>
				) : (
					// Text Preview Section - Shown after file processing
					<div className="space-y-6">
						<h2 className="text-2xl font-semibold">Converted Text</h2>
						<TextPreview parsedSubtitles={parsedSubtitles} onReset={handleReset} />
					</div>
				)}
			</div>
			{/* Toast notifications container */}
			<Toaster position="bottom-right" />
		</main>
	)
}

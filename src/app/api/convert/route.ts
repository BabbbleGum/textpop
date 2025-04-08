/**
 * API Route for VTT file conversion
 * Handles parsing VTT files into clean text
 */

import { NextRequest, NextResponse } from "next/server"

/**
 * Parses a VTT file content into clean text
 * Removes timestamps, cue identifiers, and other VTT-specific formatting
 * 
 * @param content - Raw VTT file content
 * @returns Cleaned text content
 */
function parseVTT(content: string): string {
  // Remove WEBVTT header and metadata
  const lines = content.split("\n").filter(line => line.trim() !== "WEBVTT");
  
  let cleanedText = "";
  let currentText = "";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines, timestamp lines, and cue identifiers
    if (
      line === "" || 
      line.match(/^\d{2}:\d{2}:\d{2}/) || 
      line.match(/^\d{2}:\d{2}/) ||
      line.match(/-->/i) ||
      !isNaN(Number(line)) // Skip numeric identifiers
    ) {
      // If we've accumulated text and are now hitting a timestamp/empty line, save it
      if (currentText) {
        cleanedText += currentText + " ";
        currentText = "";
      }
      continue;
    }
    
    // This is actual caption text - add it to the current text buffer
    currentText += line + " ";
  }
  
  // Add any remaining text
  if (currentText) {
    cleanedText += currentText;
  }
  
  // Clean up the text by removing duplicate spaces and normalizing punctuation
  return cleanedText
    .replace(/\s+/g, " ")
    .replace(/ \./g, ".")
    .replace(/ ,/g, ",")
    .replace(/ \?/g, "?")
    .replace(/ !/g, "!")
    .replace(/ :/g, ":")
    .replace(/ ;/g, ";")
    .trim();
}

/**
 * POST handler for converting VTT files
 * Accepts VTT content in the request body and returns cleaned text
 */
export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        { error: "No VTT content provided" },
        { status: 400 }
      );
    }
    
    const cleanedText = parseVTT(content);
    
    return NextResponse.json({
      success: true,
      text: cleanedText,
      statistics: {
        originalLength: content.length,
        cleanedLength: cleanedText.length,
        reductionPercentage: Math.round((1 - cleanedText.length / content.length) * 100)
      }
    });
  } catch (error) {
    console.error("Error processing VTT:", error);
    return NextResponse.json(
      { error: "Failed to process VTT file" },
      { status: 500 }
    );
  }
} 
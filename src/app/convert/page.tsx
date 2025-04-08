/**
 * VTT to Text Conversion Page
 * 
 * Allows users to upload VTT subtitle files and convert them to clean text format
 */

"use client"

import { useState, useEffect } from "react"
import { FileUploader } from "@/components/conversion/FileUploader"
import { parseSubtitles, convertToCleanText } from "@/lib/utils/subtitleParser"
import { ParsedSubtitle } from "@/types/subtitles"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, FileText, Clock, AlignJustify, Download } from "lucide-react"
import { toast } from "sonner"
import { saveAs } from "file-saver"

export default function ConvertPage() {
  const [convertedText, setConvertedText] = useState<string>("")
  const [parsedSubtitle, setParsedSubtitle] = useState<ParsedSubtitle | null>(null)
  const [originalFileName, setOriginalFileName] = useState<string>("")
  
  // Try to initialize filename from localStorage on component mount
  useEffect(() => {
    try {
      const storedFileName = localStorage.getItem('vtt_converter_last_filename');
      if (storedFileName && !originalFileName) {
        console.log("Initializing filename from localStorage:", storedFileName);
        setOriginalFileName(storedFileName);
      }
    } catch (error) {
      console.error("Failed to retrieve filename from localStorage:", error);
    }
  }, []);

  const handleFileProcessed = (subtitle: ParsedSubtitle) => {
    setParsedSubtitle(subtitle)
    setConvertedText(convertToCleanText(subtitle))
    
    // Save the file name and log for debugging
    console.log("File processed, received file name:", subtitle.fileName);
    
    // Store the original file name in state and localStorage
    if (subtitle.fileName) {
      setOriginalFileName(subtitle.fileName);
      
      // Store in localStorage for backup/debugging
      try {
        localStorage.setItem('vtt_converter_last_filename', subtitle.fileName);
        console.log("Saved filename to localStorage:", subtitle.fileName);
      } catch (error) {
        console.error("Failed to save filename to localStorage:", error);
      }
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedText)
    toast.success("Text copied to clipboard!")
  }

  const downloadAsText = () => {
    // Log debug information
    console.log("Download triggered, original file name:", originalFileName);
    
    // Default filename if no original is available
    let newFileName = "converted_text.txt";
    
    // Try to use the original file name from state
    let fileNameToUse = originalFileName;
    
    // If not available in state, try to get it from localStorage
    if (!fileNameToUse || fileNameToUse.trim() === "") {
      try {
        const storedFileName = localStorage.getItem('vtt_converter_last_filename');
        if (storedFileName) {
          console.log("Retrieved filename from localStorage:", storedFileName);
          fileNameToUse = storedFileName;
        }
      } catch (error) {
        console.error("Failed to retrieve filename from localStorage:", error);
      }
    }
    
    // Generate the final file name
    if (fileNameToUse && fileNameToUse.trim() !== "") {
      console.log("Using file name:", fileNameToUse);
      // Ensure .vtt is replaced with .txt, or add .txt if no .vtt extension
      if (fileNameToUse.toLowerCase().endsWith('.vtt')) {
        newFileName = fileNameToUse.replace(/\.vtt$/i, '.txt');
      } else {
        newFileName = fileNameToUse + '.txt';
      }
      console.log("Final file name for download:", newFileName);
    }
    
    // Create a blob with the text content
    const blob = new Blob([convertedText], { type: "text/plain;charset=utf-8" });
    
    // Use FileSaver to save the file
    saveAs(blob, newFileName);
    
    toast.success(`Text file "${newFileName}" downloaded!`);
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          VTT to Text Converter
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Convert your subtitle files to clean, readable text with just a few clicks
        </p>
      </section>

      {/* File Upload Section */}
      <section className="mb-16">
        <div 
          className="bg-white rounded-[40px] mx-auto max-w-3xl overflow-hidden border-2 border-dashed"
          style={{ borderColor: "#00C2FF" }}
        >
          <FileUploader onFileProcessed={handleFileProcessed} convertedText={convertedText} />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="rounded-full bg-brand-blue/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <FileText className="h-7 w-7 text-brand-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Clean Format</h3>
            <p className="text-gray-600">
              Removes timestamps and speaker labels for clean, readable text
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="rounded-full bg-brand-pink/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Clock className="h-7 w-7 text-brand-pink" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600">
              Convert your subtitle files in seconds with our efficient engine
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="rounded-full bg-brand-blue/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <AlignJustify className="h-7 w-7 text-brand-blue" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Paragraph Support</h3>
            <p className="text-gray-600">
              Automatically structures content into natural paragraphs
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="rounded-full bg-brand-pink/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Download className="h-7 w-7 text-brand-pink" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Download</h3>
            <p className="text-gray-600">
              Save your converted text as a clean TXT file with one click
            </p>
          </div>
        </div>
      </section>

      {/* Converted Text Preview Section */}
      {convertedText && (
        <section>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-500 mr-2" />
                <h3 className="font-medium">Converted Text</h3>
                <Badge className="ml-3 bg-brand-pink/10 text-brand-pink hover:bg-brand-pink/20">
                  {parsedSubtitle?.cues?.length || 0} entries
                </Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="flex items-center"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadAsText}
                  className="flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="preview">
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="raw">Raw Text</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="preview" className="m-0">
                <div className="p-6 max-h-96 overflow-y-auto whitespace-pre-wrap bg-white">
                  {convertedText.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="raw" className="m-0">
                <pre className="p-6 max-h-96 overflow-auto text-sm font-mono bg-gray-50">
                  {convertedText}
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}
    </div>
  )
} 
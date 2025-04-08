/**
 * FileUploader Component
 * Handles file upload and processing for subtitle files
 * Provides drag-and-drop and click-to-upload functionality
 */

"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { parseSubtitles } from "@/lib/utils/subtitleParser"
import { ParsedSubtitle } from "@/types/subtitles"
import { toast } from "sonner"
import { Check, Upload, Play } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Component props interface
interface FileUploaderProps {
  onFileProcessed: (parsedSubtitles: ParsedSubtitle) => void
  convertedText?: string
}

export const FileUploader = ({ onFileProcessed, convertedText }: FileUploaderProps) => {
  // State management for upload and conversion process
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  /**
   * Simulates file upload progress
   * In a production environment, this would be replaced with actual upload progress
   */
  const simulateUploadProgress = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setUploadSuccess(true)
      }
    }, 200)
  }

  /**
   * Handles the file conversion process
   * Parses the uploaded subtitle file and passes the result to the parent component
   */
  const handleConvert = async () => {
    if (!uploadedFile) return

    setIsConverting(true)
    try {
      const text = await uploadedFile.text()
      const parsedResult = await parseSubtitles(text)
      
      // Log the file name for debugging
      console.log("Converting file:", uploadedFile.name);
      
      // Create a new object with the file name
      const resultWithFileName = {
        ...parsedResult,
        fileName: uploadedFile.name
      }
      
      console.log("Sending parsed result with file name:", resultWithFileName.fileName);
      onFileProcessed(resultWithFileName)
    } catch (error) {
      toast.error("Error converting file. Please try again.")
      console.error("Conversion error:", error)
    }
    setIsConverting(false)
  }

  /**
   * Dropzone callback for handling file drop or selection
   * Validates file type and initiates upload process
   */
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.vtt')) {
      toast.error("Please upload a VTT file")
      return
    }

    setIsUploading(true)
    setUploadedFile(file)
    simulateUploadProgress()
  }, [])

  // Configure dropzone with accepted file types and callbacks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/vtt': ['.vtt']
    },
    multiple: false
  })

  const downloadAsText = () => {
    if (!uploadedFile || !convertedText) return

    const originalName = uploadedFile.name
    const newFileName = originalName.replace('.vtt', '.txt')
    
    const blob = new Blob([convertedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = newFileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text file downloaded!")
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer p-16 text-center upload-border transition-transform duration-300",
        isDragActive ? "scale-105" : "scale-100"
      )}
    >
      <input {...getInputProps()} />
      
      {isUploading ? (
        // Upload progress indicator
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          <p className="text-gray-600 text-lg">Uploading your subtitle file...</p>
          <Progress value={uploadProgress} className="mt-3 h-2 w-full max-w-md mx-auto rounded-full bg-gray-200" />
        </div>
      ) : uploadSuccess ? (
        // Success state with convert button
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-green-600 font-medium text-xl">File uploaded successfully!</p>
          <p className="text-gray-600">Click the convert button below to process the file</p>
          <div className="upload-border p-4 mt-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation()
                handleConvert()
              }}
              size="lg"
              disabled={isConverting}
              className="mt-4 rounded-full px-8 py-2 bg-[#E8518C] hover:bg-brand-blue text-white transition-colors duration-300"
            >
              {isConverting ? (
                <>
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-r-0 border-b-0 rounded-full" />
                  Converting...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Convert to Clean Text
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        // Initial upload state - Clean professional design
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="mb-6">
            <Upload className="h-16 w-16 text-gray-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Upload your VTT file
          </h2>
          
          <p className="text-gray-600 text-lg mb-8">
            Drag and drop or click to upload
          </p>
          
          <Button 
            variant="default" 
            size="lg"
            className="px-10 py-3 bg-[#E8518C] hover:bg-brand-blue rounded-full text-white font-medium transition-colors duration-300"
          >
            Choose File
          </Button>
        </div>
      )}
    </div>
  )
} 
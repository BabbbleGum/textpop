"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ParsedSubtitle } from "@/types/subtitles"
import { convertToCleanText, downloadAsFile } from "@/lib/utils/subtitleParser"
import { toast } from "sonner"
import { Download, Copy, RefreshCw } from "lucide-react"

interface TextPreviewProps {
  parsedSubtitles: ParsedSubtitle;
  onReset: () => void;
}

export const TextPreview = ({ parsedSubtitles, onReset }: TextPreviewProps) => {
  const getDisplayText = () => {
    return convertToCleanText(parsedSubtitles);
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getDisplayText())
      toast.success("Copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy text")
    }
  }

  const handleDownload = () => {
    const filename = `converted_text.txt`;
    downloadAsFile(getDisplayText(), filename);
    toast.success("File downloaded successfully!");
  }

  return (
    <Card className="w-full p-4 bg-background">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-lg font-medium">Plain Text</h3>
        <div className="flex gap-2">
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={onReset} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Convert Another
          </Button>
        </div>
      </div>
      
      <pre className="w-full h-[400px] overflow-auto bg-muted p-4 rounded-md text-sm">
        {getDisplayText()}
      </pre>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Total Cues: {parsedSubtitles.cues.length}</p>
        <p>Original Format: VTT</p>
      </div>
    </Card>
  )
} 
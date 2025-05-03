/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about TextPop
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What file formats does TextPop support?</AccordionTrigger>
            <AccordionContent>
              TextPop currently supports VTT and SRT subtitle files. We plan to add support for more formats in the future.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How does the conversion process work?</AccordionTrigger>
            <AccordionContent>
              Our conversion process strips out timestamps, metadata, and formatting from subtitle files, leaving you with just the text content. This makes it perfect for use with AI tools, analysis, or any other purpose where you need clean text.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Is there a limit to the file size I can upload?</AccordionTrigger>
            <AccordionContent>
              For the best performance, we recommend keeping files under 10MB. Larger files may take longer to process.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How is my data handled?</AccordionTrigger>
            <AccordionContent>
              We take privacy seriously. All processing happens in your browser - your files are never uploaded to our servers. This means your data remains completely private.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I use TextPop for commercial purposes?</AccordionTrigger>
            <AccordionContent>
              Yes! TextPop is free to use for both personal and commercial purposes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>My subtitle file isn&apos;t converting correctly. What should I do?</AccordionTrigger>
            <AccordionContent>
              First, check that your file is in a supported format (VTT or SRT). If you&apos;re still having issues, try validating your subtitle file with a subtitle editor before uploading. If problems persist, please contact us for support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>Is there an API available for TextPop?</AccordionTrigger>
            <AccordionContent>
              Not at the moment, but we&apos;re considering adding an API in the future. If you&apos;re interested in integrating TextPop into your application, please contact us.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
} 
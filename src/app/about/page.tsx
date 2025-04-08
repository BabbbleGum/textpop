export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About CleanScript
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your tool for perfect text extraction from subtitle files
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Why CleanScript?</h2>
          <p>
            CleanScript was created to solve a simple problem: extracting clean, 
            readable text from subtitle files. Whether you're working with VTT, SRT, 
            or other subtitle formats, CleanScript makes it easy to convert them 
            into plain text that's ready for analysis, AI processing, or any other use.
          </p>

          <h2>Our Features</h2>
          <ul>
            <li>
              <strong>Simple Conversion</strong> - Upload your subtitle file and get clean 
              text instantly without any formatting issues
            </li>
            <li>
              <strong>Multiple Format Support</strong> - Works with VTT, SRT, and other 
              common subtitle formats
            </li>
            <li>
              <strong>AI-Ready Text</strong> - Get perfectly formatted text that's ready 
              for AI tools and analysis
            </li>
            <li>
              <strong>Fast and Reliable</strong> - Process your files quickly and accurately 
              every time
            </li>
          </ul>

          <h2>How It Works</h2>
          <p>
            CleanScript uses advanced parsing algorithms to extract the text content from 
            subtitle files, removing timestamps, identifiers, and other metadata. The result 
            is clean, readable text that you can use for your projects.
          </p>
          <p>
            Simply upload your subtitle file, wait a moment for processing, and download 
            your clean text. It's that easy!
          </p>
        </div>
      </div>
    </main>
  )
} 
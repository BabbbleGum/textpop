# TextPop: VTT subtitle files into clean, readable text

<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="#FF69B4" stroke="#333333" stroke-width="2"/>
  </svg>
</p>

<p align="center">
  <strong>Convert VTT subtitle files to clean text for AI processing</strong>
</p>

<p align="center">
  <a href="https://textpop.vercel.app/">Visit TextPop</a> •
  <a href="#features">Features</a> •
  <a href="#use-cases">Use Cases</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#development">Development</a> •
  <a href="#license">License</a>
</p>

---

## What is TextPop?

TextPop is a simple, focused web application that converts VTT subtitle files into clean, readable text. It automatically removes timestamps, eliminates duplicates, and merges fragmented text for optimal readability, especially for AI tools and content repurposing.

### Why TextPop?

Most subtitle converters are bundled into complex video editing tools or require technical knowledge to use. TextPop provides a dedicated, distraction-free solution specifically designed for producing clean, AI-ready text with zero technical skills required.

## Features

- **One-Click Conversion**: Simple upload interface with immediate download of cleaned text
- **Advanced Text Cleaning**: Automatic removal of timestamps, deduplication of phrases, and merging of fragmented sentences
- **AI-Optimized Output**: Text formatting specifically designed for maximum compatibility with AI tools
- **Browser-Based Processing**: All conversion happens in your browser - your files never leave your computer
- **Zero Learning Curve**: No account needed, no complicated settings, just instant results

## Use Cases

- **Content Creators**: Convert video subtitles to text for blog posts, social media, and AI content generation
- **Educators**: Create clean transcripts of lecture videos for student resources and searchable archives
- **Podcast Producers**: Extract clean text from subtitle files for show notes, SEO, and content repurposing
- **AI Enthusiasts**: Prepare subtitle text for feeding into AI tools for analysis, summaries, or further processing
- **Researchers**: Extract spoken content from videos for analysis and documentation

## How It Works

1. **Upload**: Drag & drop or select your VTT file
2. **Process**: TextPop automatically cleans and formats the text
3. **Download**: Get your clean text file instantly

That's it! No account creation, no complex settings, no technical knowledge required.

## Development

TextPop is built with modern web technologies:

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

### Getting Started

```bash
# Clone the repository
git clone https://github.com/BabbbleGum/textpop.git

# Navigate to the project directory
cd textpop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

TextPop uses environment variables for configuration. An `.env.example` file is provided as a template. For local development:

1. Copy `.env.example` to `.env.local`
2. Edit the values as needed

**Important**: Never commit actual `.env` files to the repository. The `.gitignore` file is configured to exclude these files to protect sensitive information.

Required environment variables:
- `NEXT_PUBLIC_BASE_URL`: API base URL
- `AUTH_URL`: Authentication URL
- `AUTH_SECRET`: Secret for authentication
- `GITHUB_ID`: GitHub OAuth ID
- `GITHUB_SECRET`: GitHub OAuth Secret

## Upcoming Features

- Batch processing for multiple files
- Additional output format options
- Custom text cleaning preferences
- Integration with cloud storage services

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

Found a bug or have a feature request? [Open an issue](https://github.com/BabbbleGum/textpop/issues) on GitHub.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/BabbbleGum">BabbbleGum</a>
</p>

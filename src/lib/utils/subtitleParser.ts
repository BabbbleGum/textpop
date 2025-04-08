import { SubtitleCue, ParsedSubtitle } from '@/types/subtitles';

const parseTimestamp = (timestamp: string): string => {
  // Normalize timestamp format
  timestamp = timestamp.replace(',', '.');
  if (timestamp.split(':').length === 2) {
    timestamp = '00:' + timestamp;
  }
  return timestamp;
};

// Function to clean text with <00:00:00.000><c> format
const cleanSpecialFormat = (text: string): string => {
  // Remove timestamp tags like <00:00:00.160>
  let cleaned = text.replace(/<\d\d:\d\d:\d\d\.\d\d\d>/g, '');
  // Remove <c> and </c> tags
  cleaned = cleaned.replace(/<\/?c>/g, '');
  // Trim any extra whitespace
  cleaned = cleaned.trim();
  return cleaned;
};

// Check if text contains the special format with <00:00:00.000><c> tags
const hasSpecialFormat = (text: string): boolean => {
  return /<\d\d:\d\d:\d\d\.\d\d\d>/.test(text);
};

const parseVTT = (content: string): SubtitleCue[] => {
  console.log("Parsing VTT content:", content.substring(0, 100) + "...");
  
  // Check if this is the special format with <00:00:00.000><c> tags
  if (hasSpecialFormat(content)) {
    return parseSpecialFormat(content);
  }
  
  const lines = content.trim().split('\n');
  console.log("Lines:", lines.length);
  const cues: SubtitleCue[] = [];
  let currentCue: Partial<SubtitleCue> = {};
  let textLines: string[] = [];

  // Skip WEBVTT header
  let i = content.startsWith('WEBVTT') ? 1 : 0;
  console.log("Starting at line:", i, "Content starts with WEBVTT:", content.startsWith('WEBVTT'));

  while (i < lines.length) {
    const line = lines[i].trim();
    console.log(`Line ${i}:`, line);

    if (line === '') {
      if (textLines.length && currentCue.startTime) {
        // Clean text content by removing formatting info
        const cleanTextContent = textLines
          .join('\n')
          .replace(/align:start position:0%/g, '')
          .replace(/\d\d:\d\d:\d\d\.\d\d\d -->.*/g, '')
          .trim();
          
        console.log("Adding cue with text:", cleanTextContent);
        
        if (cleanTextContent.length > 0) {
          cues.push({
            id: cues.length + 1,
            startTime: currentCue.startTime!,
            endTime: currentCue.endTime!,
            text: cleanTextContent
          });
        }
        currentCue = {};
        textLines = [];
      }
    } else if (line.includes('-->')) {
      console.log("Found timestamp line:", line);
      const [start, end] = line.split('-->').map(t => parseTimestamp(t.trim()));
      currentCue.startTime = start;
      currentCue.endTime = end;
    } else if (currentCue.startTime) {
      // Don't add timestamp/formatting lines to text
      if (!line.includes('align:start position:') && !line.match(/^\d\d:\d\d:\d\d\.\d\d\d/)) {
        console.log("Adding text line:", line);
        textLines.push(line);
      }
    }
    i++;
  }

  // Handle last cue
  if (textLines.length && currentCue.startTime) {
    // Clean text content by removing formatting info
    const cleanTextContent = textLines
      .join('\n')
      .replace(/align:start position:0%/g, '')
      .replace(/\d\d:\d\d:\d\d\.\d\d\d -->.*/g, '')
      .trim();
      
    console.log("Adding final cue with text:", cleanTextContent);
    
    if (cleanTextContent.length > 0) {
      cues.push({
        id: cues.length + 1,
        startTime: currentCue.startTime!,
        endTime: currentCue.endTime!,
        text: cleanTextContent
      });
    }
  }

  console.log("Parsed cues:", cues.length);
  return cues;
};

// Parse the special format with <00:00:00.000><c> tags
const parseSpecialFormat = (content: string): SubtitleCue[] => {
  console.log("Parsing special format content");
  
  // Split the content by double newlines to get paragraphs
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim() !== '');
  const cues: SubtitleCue[] = [];
  
  paragraphs.forEach((paragraph, index) => {
    // Clean the paragraph text
    const cleanedText = cleanSpecialFormat(paragraph);
    
    if (cleanedText) {
      cues.push({
        id: index + 1,
        startTime: '00:00:00.000', // We don't have real timestamps in this format
        endTime: '00:00:10.000',   // Using a default duration
        text: cleanedText
      });
    }
  });
  
  console.log("Parsed special format cues:", cues.length);
  return cues;
};

const parseSRT = (content: string): SubtitleCue[] => {
  // Check if this is the special format with <00:00:00.000><c> tags
  if (hasSpecialFormat(content)) {
    return parseSpecialFormat(content);
  }
  
  const lines = content.trim().split('\n');
  const cues: SubtitleCue[] = [];
  let currentCue: Partial<SubtitleCue> = {};
  let textLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '') {
      if (textLines.length && currentCue.startTime) {
        cues.push({
          id: currentCue.id!,
          startTime: currentCue.startTime,
          endTime: currentCue.endTime!,
          text: textLines.join('\n')
        });
        currentCue = {};
        textLines = [];
      }
    } else if (/^\d+$/.test(line)) {
      currentCue.id = parseInt(line);
    } else if (line.includes('-->')) {
      const [start, end] = line.split('-->').map(t => parseTimestamp(t.trim()));
      currentCue.startTime = start;
      currentCue.endTime = end;
    } else if (currentCue.startTime) {
      textLines.push(line);
    }
  }

  // Handle last cue
  if (textLines.length && currentCue.startTime) {
    cues.push({
      id: currentCue.id!,
      startTime: currentCue.startTime,
      endTime: currentCue.endTime!,
      text: textLines.join('\n')
    });
  }

  return cues;
};

export const parseSubtitles = (content: string): ParsedSubtitle => {
  console.log("parseSubtitles called with content length:", content.length);
  
  // Check if this is the special format with <00:00:00.000><c> tags
  if (hasSpecialFormat(content)) {
    console.log("Detected special format with timestamp tags");
    const cues = parseSpecialFormat(content);
    return {
      cues,
      format: 'vtt', // Treating this as VTT format
      originalText: content
    };
  }
  
  const format = content.trim().startsWith('WEBVTT') ? 'vtt' : 'srt';
  console.log("Detected format:", format);
  const cues = format === 'vtt' ? parseVTT(content) : parseSRT(content);
  console.log("Parsed cues:", cues.length);

  return {
    cues,
    format,
    originalText: content
  };
};

export const formatTime = (time: string): string => {
  return time.replace('.', ',');
};

export const convertToVTT = (parsed: ParsedSubtitle): string => {
  if (parsed.format === 'vtt') return parsed.originalText;
  
  const header = 'WEBVTT\n\n';
  const cues = parsed.cues.map(cue => 
    `${cue.startTime} --> ${cue.endTime}\n${cue.text}`
  ).join('\n\n');
  
  return header + cues;
};

export const convertToSRT = (parsed: ParsedSubtitle): string => {
  if (parsed.format === 'srt') return parsed.originalText;
  
  return parsed.cues.map((cue, index) => 
    `${index + 1}\n${formatTime(cue.startTime)} --> ${formatTime(cue.endTime)}\n${cue.text}`
  ).join('\n\n');
};

export const convertToCleanText = (parsed: ParsedSubtitle): string => {
  // Extract the text content from each cue
  const allLines: string[] = parsed.cues.map(cue => 
    cue.text
      // Remove alignment and positioning info
      .replace(/^.*align:start position:0%.*$/gm, '')
      // Remove timestamp lines
      .replace(/^\s*\d\d:\d\d:\d\d\.\d\d\d.*$/gm, '')
      // Remove HTML-like tags (including <c> tags and timestamp tags like <00:00:00.160>)
      .replace(/<[^>]+>/g, '')
      // Remove any remaining webvtt specific formatting
      .replace(/^NOTE.*$/gm, '')
      .trim()
  ).filter(text => text.length > 0);
  
  // Remove duplicates and build a coherent text
  const result: string[] = [];
  let combinedText = '';
  
  // Process each line and check for duplicates or partial duplicates
  for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i];
    
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Check if this line is already included in our combined text
    if (combinedText.includes(line)) continue;
    
    // Check if this line is a continuation of the previous content
    // (i.e., it starts with the end of the previous content)
    let isPartialDuplicate = false;
    for (let j = Math.max(0, result.length - 3); j < result.length; j++) {
      const prevLine = result[j];
      
      // If this line is a subset of a previous line, skip it
      if (prevLine.includes(line)) {
        isPartialDuplicate = true;
        break;
      }
      
      // Check if this line continues the previous line
      // Find the longest common substring from the end of the previous line
      let overlap = 0;
      for (let k = 1; k <= Math.min(prevLine.length, line.length); k++) {
        if (prevLine.endsWith(line.substring(0, k))) {
          overlap = k;
        }
      }
      
      // If there's significant overlap (more than 5 characters),
      // replace the previous line with a merged version
      if (overlap > 5) {
        result[j] = prevLine + line.substring(overlap);
        combinedText = result.join(' ');
        isPartialDuplicate = true;
        break;
      }
    }
    
    if (!isPartialDuplicate) {
      result.push(line);
      combinedText = result.join(' ');
    }
  }
  
  // Join the result with proper paragraph formatting
  return result
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .replace(/[ \t]+/g, ' ')    // Replace multiple spaces with a single space
    .trim();
};

export const downloadAsFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}; 
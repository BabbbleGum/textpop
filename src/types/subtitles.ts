export interface SubtitleCue {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

export interface ParsedSubtitle {
  cues: SubtitleCue[];
  format: 'vtt' | 'srt';
  originalText: string;
  fileName: string;
}

export type TimeFormat = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface ValidationError {
  type: 'timestamp' | 'format' | 'content' | 'overlap' | 'general';
  message: string;
  line?: number;
  cue?: SubtitleCue;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface TimestampFormat {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export type SubtitleFormat = 'vtt' | 'srt' | 'unknown'; 
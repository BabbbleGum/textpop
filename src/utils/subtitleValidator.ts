import { SubtitleCue, ValidationError, ValidationResult, TimestampFormat } from '@/types/subtitles';

export class SubtitleValidator {
  private static timestampRegex = /^(\d{2}):(\d{2}):(\d{2})[,.](\d{3})$/;

  static validateTimestamp(timestamp: string): boolean {
    if (!this.timestampRegex.test(timestamp)) return false;
    
    const [_, hours, minutes, seconds, milliseconds] = this.timestampRegex.exec(timestamp) || [];
    return (
      parseInt(hours) >= 0 && parseInt(hours) <= 99 &&
      parseInt(minutes) >= 0 && parseInt(minutes) <= 59 &&
      parseInt(seconds) >= 0 && parseInt(seconds) <= 59 &&
      parseInt(milliseconds) >= 0 && parseInt(milliseconds) <= 999
    );
  }

  static parseTimestamp(timestamp: string): TimestampFormat | null {
    if (!this.validateTimestamp(timestamp)) return null;
    
    const [_, hours, minutes, seconds, milliseconds] = this.timestampRegex.exec(timestamp) || [];
    return {
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
      milliseconds: parseInt(milliseconds)
    };
  }

  static checkOverlap(cue1: SubtitleCue, cue2: SubtitleCue): boolean {
    const time1Start = this.parseTimestamp(cue1.startTime);
    const time1End = this.parseTimestamp(cue1.endTime);
    const time2Start = this.parseTimestamp(cue2.startTime);
    const time2End = this.parseTimestamp(cue2.endTime);

    if (!time1Start || !time1End || !time2Start || !time2End) return false;

    const start1 = this.timestampToMs(time1Start);
    const end1 = this.timestampToMs(time1End);
    const start2 = this.timestampToMs(time2Start);
    const end2 = this.timestampToMs(time2End);

    return (start1 <= end2) && (end1 >= start2);
  }

  private static timestampToMs(time: TimestampFormat): number {
    return (
      time.hours * 3600000 +
      time.minutes * 60000 +
      time.seconds * 1000 +
      time.milliseconds
    );
  }

  static validateCue(cue: SubtitleCue): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate timestamps
    if (!this.validateTimestamp(cue.startTime)) {
      errors.push({
        type: 'timestamp',
        message: `Invalid start time format: ${cue.startTime}`,
        cue,
        severity: 'error'
      });
    }

    if (!this.validateTimestamp(cue.endTime)) {
      errors.push({
        type: 'timestamp',
        message: `Invalid end time format: ${cue.endTime}`,
        cue,
        severity: 'error'
      });
    }

    // Validate timing logic
    const startMs = this.timestampToMs(this.parseTimestamp(cue.startTime) || { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const endMs = this.timestampToMs(this.parseTimestamp(cue.endTime) || { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

    if (startMs >= endMs) {
      errors.push({
        type: 'timestamp',
        message: 'End time must be after start time',
        cue,
        severity: 'error'
      });
    }

    // Validate content
    if (!cue.text.trim()) {
      errors.push({
        type: 'content',
        message: 'Empty subtitle text',
        cue,
        severity: 'warning'
      });
    }

    return errors;
  }

  static validateSubtitles(cues: SubtitleCue[]): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // Validate individual cues
    cues.forEach((cue, index) => {
      const cueErrors = this.validateCue(cue);
      
      cueErrors.forEach(error => {
        if (error.severity === 'error') {
          result.errors.push({ ...error, line: index + 1 });
          result.isValid = false;
        } else {
          result.warnings.push({ ...error, line: index + 1 });
        }
      });

      // Check for overlaps with next cue
      if (index < cues.length - 1 && this.checkOverlap(cue, cues[index + 1])) {
        result.warnings.push({
          type: 'overlap',
          message: `Subtitle timing overlaps with next cue`,
          cue,
          line: index + 1,
          severity: 'warning'
        });
      }
    });

    return result;
  }
} 
'use client';

import { ValidationError } from '@/types/subtitles';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, AlertTriangle } from 'lucide-react';

interface ValidationErrorsProps {
  errors: ValidationError[];
  warnings: ValidationError[];
}

export const ValidationErrors = ({
  errors,
  warnings,
}: ValidationErrorsProps) => {
  if (errors.length === 0 && warnings.length === 0) return null;

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      {errors.map((error, index) => (
        <Alert variant="destructive" className="mb-2" key={`error-${index}`}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error on line {error.line}</AlertTitle>
          <AlertDescription className="mt-1">
            {error.message}
            {error.cue && (
              <pre className="mt-2 rounded bg-secondary/50 p-2 text-sm">
                {JSON.stringify(error.cue, null, 2)}
              </pre>
            )}
          </AlertDescription>
        </Alert>
      ))}

      {warnings.map((warning, index) => (
        <Alert variant="warning" className="mb-2" key={`warning-${index}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning on line {warning.line}</AlertTitle>
          <AlertDescription className="mt-1">
            {warning.message}
            {warning.cue && (
              <pre className="mt-2 rounded bg-secondary/50 p-2 text-sm">
                {JSON.stringify(warning.cue, null, 2)}
              </pre>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </ScrollArea>
  );
}; 
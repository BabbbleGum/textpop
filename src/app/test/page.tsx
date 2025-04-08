'use client';

import { useEffect, useState } from 'react';
import { parseSubtitles } from '@/lib/utils/subtitleParser';
import { ParsedSubtitle } from '@/types/subtitles';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  const [result, setResult] = useState<ParsedSubtitle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testVTT = `WEBVTT

00:00:01.000 --> 00:00:05.000
This is a test subtitle

00:00:06.000 --> 00:00:10.000
This is another test subtitle`;

  const runTest = () => {
    try {
      console.log('Running test with VTT content:', testVTT);
      const parsed = parseSubtitles(testVTT);
      console.log('Test result:', parsed);
      setResult(parsed);
      setError(null);
    } catch (err) {
      console.error('Test error:', err);
      setError(err instanceof Error ? err.message : String(err));
      setResult(null);
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">VTT Parser Test</h1>
      
      <Button onClick={runTest} className="mb-6">Run Test</Button>
      
      {error && (
        <Card className="p-4 mb-6 bg-red-50 border-red-200">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <pre className="whitespace-pre-wrap">{error}</pre>
        </Card>
      )}
      
      {result && (
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <div className="mb-4">
            <p><strong>Format:</strong> {result.format}</p>
            <p><strong>Cues:</strong> {result.cues.length}</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Cues</h3>
          <div className="space-y-4">
            {result.cues.map((cue) => (
              <Card key={cue.id} className="p-3 bg-gray-50">
                <p><strong>ID:</strong> {cue.id}</p>
                <p><strong>Time:</strong> {cue.startTime} → {cue.endTime}</p>
                <p><strong>Text:</strong> {cue.text}</p>
              </Card>
            ))}
          </div>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Original Text</h3>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{result.originalText}</pre>
        </Card>
      )}
    </main>
  );
} 